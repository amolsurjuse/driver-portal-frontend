import MapKit
import SwiftUI

// MARK: - Station Map View

struct StationMapView: View {
    let stationService: StationService
    let chargerGraphQLService: ChargerGraphQLService
    let chargingSessionService: ChargingSessionService

    @StateObject private var viewModel = StationMapViewModel()
    @State private var selectedStation: StationLocation?
    @State private var showDetail = false
    @State private var cameraPosition: MapCameraPosition = .region(
        MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 37.56, longitude: -122.15),
            span: MKCoordinateSpan(latitudeDelta: 0.8, longitudeDelta: 0.8)
        )
    )

    var body: some View {
        ZStack(alignment: .bottom) {
            Map(position: $cameraPosition, selection: $selectedStation) {
                ForEach(viewModel.stations) { station in
                    Annotation(station.name, coordinate: station.coordinate, anchor: .bottom) {
                        StationAnnotationView(station: station)
                    }
                    .tag(station)
                }

                UserAnnotation()
            }
            .mapStyle(.standard(elevation: .realistic, pointsOfInterest: .including([.evCharger, .parking])))
            .mapControls {
                MapUserLocationButton()
                MapCompass()
                MapScaleView()
            }
            .onChange(of: selectedStation) { _, station in
                if station != nil {
                    let generator = UIImpactFeedbackGenerator(style: .medium)
                    generator.impactOccurred()
                    showDetail = true
                }
            }

            // Floating charger count pill
            if !viewModel.stations.isEmpty {
                HStack(spacing: 6) {
                    Image(systemName: "ev.plug.dc.ccs2")
                        .font(.caption.weight(.bold))
                    Text("\(viewModel.stations.count) chargers nearby")
                        .font(.subheadline.weight(.semibold))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(.ultraThinMaterial, in: Capsule())
                .padding(.bottom, selectedStation != nil ? 240 : 16)
                .animation(.spring(duration: 0.35), value: selectedStation)
            }

            // Loading overlay
            if viewModel.isLoading {
                VStack {
                    ProgressView()
                        .controlSize(.large)
                    Text("Finding chargers…")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .padding(24)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
            }

            // Error banner
            if let error = viewModel.error {
                VStack(spacing: 8) {
                    HStack {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .foregroundStyle(.orange)
                        Text(error)
                            .font(.subheadline)
                    }
                    Button("Retry") {
                        Task { await viewModel.loadChargers(service: chargerGraphQLService, fallbackService: stationService) }
                    }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.small)
                }
                .padding(16)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
                .padding()
            }
        }
        .navigationTitle("Chargers")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showDetail) {
            if let station = selectedStation {
                StationDetailSheet(
                    station: station,
                    chargerGraphQLService: chargerGraphQLService,
                    chargingSessionService: chargingSessionService
                )
                    .presentationDetents([.medium, .large])
                    .presentationDragIndicator(.visible)
            }
        }
        .task {
            await viewModel.loadChargers(service: chargerGraphQLService, fallbackService: stationService)
        }
    }
}

// MARK: - Station Annotation View

private struct StationAnnotationView: View {
    let station: StationLocation

    var body: some View {
        VStack(spacing: 0) {
            ZStack {
                Circle()
                    .fill(annotationColor)
                    .frame(width: 36, height: 36)
                    .shadow(color: annotationColor.opacity(0.4), radius: 6, y: 3)

                Image(systemName: "ev.plug.dc.ccs2")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(.white)
            }

            // Triangle pointer
            Triangle()
                .fill(annotationColor)
                .frame(width: 12, height: 8)
                .offset(y: -2)
        }
    }

    private var annotationColor: Color {
        switch station.status {
        case .available: return .green
        case .occupied: return .orange
        case .offline: return .gray
        case .faulted: return .red
        }
    }
}

private struct Triangle: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.minY))
        path.closeSubpath()
        return path
    }
}

// MARK: - Station Detail Sheet

private struct StationDetailSheet: View {
    let station: StationLocation
    let chargerGraphQLService: ChargerGraphQLService
    let chargingSessionService: ChargingSessionService

    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var sessionStore: SessionStore
    @State private var selectedConnector: ConnectorSummary?
    @State private var chargerDetail: OcpiCharger?
    @State private var isLoadingChargerDetail = false
    @State private var chargerDetailError: String?
    @State private var actionFeedback: String?
    @State private var isProcessingAction = false
    @State private var connectorDetail: OcpiConnector?
    @State private var isLoadingDetail = false
    @State private var detailError: String?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Header
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            PortalBadge(
                                title: station.status.rawValue.capitalized,
                                tint: Color(station.statusColor == "green" ? .systemGreen :
                                            station.statusColor == "orange" ? .systemOrange :
                                            station.statusColor == "red" ? .systemRed : .systemGray)
                            )
                            Spacer()
                            if let hours = station.operatingHours {
                                Label(hours, systemImage: "clock")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }

                        Text(station.name)
                            .font(.title2.weight(.bold))

                        Label("\(station.address), \(station.city), \(station.state) \(station.postalCode)",
                              systemImage: "mappin.and.ellipse")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }

                    // Availability summary
                    HStack(spacing: 16) {
                        StatBox(value: "\(station.availableConnectors)", label: "Available", tint: .green)
                        StatBox(value: "\(station.busyConnectors)", label: "Busy", tint: .orange)
                        StatBox(value: "\(station.connectors.first?.power ?? 0) kW", label: "Max Power", tint: .orange)
                    }

                    // Connectors list
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Connectors")
                            .font(.headline)

                        ForEach(station.connectors) { connector in
                            ConnectorRow(connector: connector)
                                .onTapGesture {
                                    Haptics.selection()
                                    selectedConnector = connector
                                    fetchConnectorDetail(connectorId: connector.id)
                                }
                        }
                    }

                    // Actions
                    VStack(spacing: 12) {
                        if case .stopEnabled(let sessionId) = actionState {
                            Button {
                                Task { await stopCharging(sessionId: sessionId) }
                            } label: {
                                Label("Stop Charging", systemImage: "stop.circle.fill")
                                    .frame(maxWidth: .infinity)
                            }
                            .buttonStyle(.borderedProminent)
                            .controlSize(.large)
                            .tint(.red)
                            .disabled(isProcessingAction || isLoadingChargerDetail)
                        } else {
                            HStack(spacing: 8) {
                                Image(systemName: "info.circle.fill")
                                    .foregroundStyle(.blue)
                                Text("Select a connector to see pricing and start charging.")
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                            .padding(12)
                            .background(
                                RoundedRectangle(cornerRadius: 12, style: .continuous)
                                    .fill(Color.blue.opacity(0.08))
                            )
                        }

                        if let actionFeedback {
                            HStack(spacing: 8) {
                                Image(systemName: "info.circle.fill")
                                    .foregroundStyle(.blue)
                                Text(actionFeedback)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }

                        if isLoadingChargerDetail {
                            HStack(spacing: 8) {
                                ProgressView()
                                    .controlSize(.small)
                                Text("Refreshing charger status...")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        } else if let chargerDetailError {
                            HStack(spacing: 8) {
                                Image(systemName: "exclamationmark.triangle.fill")
                                    .foregroundStyle(.orange)
                                Text(chargerDetailError)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }

                        Button {
                            openInMaps()
                        } label: {
                            Label("Get Directions", systemImage: "arrow.triangle.turn.up.right.diamond.fill")
                                .frame(maxWidth: .infinity)
                        }
                        .buttonStyle(.borderedProminent)
                        .controlSize(.large)
                        .tint(Color(red: 0.10, green: 0.38, blue: 0.73))
                    }
                }
                .padding(20)
            }
            .background(Color(red: 0.96, green: 0.97, blue: 0.99))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
            .sheet(item: $selectedConnector) { connector in
                ConnectorDetailSheet(
                    connector: connector,
                    ocpiConnector: connectorDetail,
                    chargerId: station.id,
                    locationId: chargerDetail.flatMap { $0.location?.ocpiLocationId },
                    chargingSessionService: chargingSessionService,
                    isLoading: isLoadingDetail,
                    error: detailError,
                    onSessionStarted: { sessionId in
                        actionFeedback = "Start request accepted (\(sessionId)). Waiting for charger updates."
                        Task { await loadChargerDetail(forceRefresh: true) }
                    }
                )
                .presentationDetents([.medium])
                .presentationDragIndicator(.visible)
            }
            .task {
                await loadChargerDetail(forceRefresh: false)
            }
        }
    }

    private func fetchConnectorDetail(connectorId: String) {
        isLoadingDetail = true
        connectorDetail = nil
        detailError = nil

        Task {
            do {
                let charger = try await loadOrFetchChargerDetail()
                let match = charger.evses
                    .flatMap(\.connectors)
                    .first(where: { $0.id == connectorId })
                connectorDetail = match
                if match == nil {
                    detailError = "Connector details not found."
                }
            } catch {
                detailError = error.localizedDescription
            }
            isLoadingDetail = false
        }
    }

    private func loadOrFetchChargerDetail() async throws -> OcpiCharger {
        if let chargerDetail {
            return chargerDetail
        }
        let charger = try await chargerGraphQLService.getChargerDetail(chargerId: station.id)
        chargerDetail = charger
        return charger
    }

    private func loadChargerDetail(forceRefresh: Bool) async {
        if !forceRefresh, chargerDetail != nil {
            return
        }

        isLoadingChargerDetail = true
        chargerDetailError = nil
        do {
            chargerDetail = try await chargerGraphQLService.getChargerDetail(chargerId: station.id)
        } catch {
            chargerDetailError = error.localizedDescription
        }
        isLoadingChargerDetail = false
    }

    private func stopCharging(sessionId: String) async {
        isProcessingAction = true
        defer { isProcessingAction = false }

        do {
            try await chargingSessionService.stopSession(sessionId: sessionId)
            actionFeedback = "Stop request submitted."
            await loadChargerDetail(forceRefresh: true)
        } catch {
            actionFeedback = "Unable to stop charging right now: \(error.localizedDescription)"
        }
    }

    private var effectiveStatus: String {
        (chargerDetail?.status ?? station.status.rawValue).uppercased()
    }

    private var actionState: ChargerActionState {
        switch effectiveStatus {
        case "CHARGING":
            guard let currentSession = chargerDetail?.currentSession else {
                return .disabled(reason: "Another driver is actively using this charger.")
            }

            guard let loggedInUserId = sessionStore.userId, !loggedInUserId.isEmpty else {
                return .disabled(reason: "Sign in to manage this charging session.")
            }

            guard let sessionOwner = currentSession.userId, sessionOwner == loggedInUserId else {
                return .disabled(reason: "Another driver is actively using this charger.")
            }

            return .stopEnabled(sessionId: currentSession.id)
        default:
            return .disabled(reason: "No active session to stop at this charger.")
        }
    }

    private enum ChargerActionState {
        case stopEnabled(sessionId: String)
        case disabled(reason: String)
    }

    private func openInMaps() {
        let placemark = MKPlacemark(coordinate: station.coordinate)
        let mapItem = MKMapItem(placemark: placemark)
        mapItem.name = station.name
        mapItem.openInMaps(launchOptions: [MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeDriving])
    }
}

private struct StatBox: View {
    let value: String
    let label: String
    let tint: Color

    var body: some View {
        VStack(spacing: 6) {
            Text(value)
                .font(.title3.weight(.bold))
                .foregroundStyle(tint)
            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(tint.opacity(0.08))
        )
    }
}

private struct ConnectorRow: View {
    let connector: ConnectorSummary

    var body: some View {
        HStack {
            ZStack {
                Circle()
                    .fill(statusColor.opacity(0.14))
                    .frame(width: 40, height: 40)
                Image(systemName: connectorIcon)
                    .foregroundStyle(statusColor)
                    .font(.system(size: 16, weight: .semibold))
            }

            VStack(alignment: .leading, spacing: 2) {
                Text(connector.typeLabel)
                    .font(.subheadline.weight(.semibold))
                Text("\(connector.powerLabel) · $\(String(format: "%.2f", connector.tariffPerKwh))/kWh")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            PortalBadge(title: connector.status.rawValue.capitalized, tint: statusColor)
        }
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(.white)
                .shadow(color: .black.opacity(0.04), radius: 8, y: 4)
        )
    }

    private var statusColor: Color {
        switch connector.status {
        case .available: return .green
        case .charging: return .blue
        case .faulted: return .red
        case .offline: return .gray
        case .reserved: return .purple
        }
    }

    private var connectorIcon: String {
        switch connector.type {
        case .ccs2: return "ev.plug.dc.ccs2"
        case .chademo: return "ev.plug.dc.chademo"
        case .type2: return "ev.plug.ac.type.2"
        case .type1: return "ev.plug.ac.type.1"
        }
    }
}

// MARK: - Connector Detail Sheet

private struct ConnectorDetailSheet: View {
    let connector: ConnectorSummary
    let ocpiConnector: OcpiConnector?
    let chargerId: String
    let locationId: String?
    let chargingSessionService: ChargingSessionService
    let isLoading: Bool
    let error: String?
    let onSessionStarted: (String) -> Void

    @EnvironmentObject private var sessionStore: SessionStore
    @State private var isStarting = false
    @State private var actionFeedback: String?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Connector header
                    HStack(spacing: 14) {
                        ZStack {
                            Circle()
                                .fill(statusColor.opacity(0.14))
                                .frame(width: 56, height: 56)
                            Image(systemName: connectorIcon)
                                .font(.system(size: 24, weight: .bold))
                                .foregroundStyle(statusColor)
                        }

                        VStack(alignment: .leading, spacing: 4) {
                            Text(connector.typeLabel)
                                .font(.title3.weight(.bold))
                            Text("Connector \(connector.id)")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }

                        Spacer()

                        PortalBadge(title: connector.status.rawValue.capitalized, tint: statusColor)
                    }

                    if isLoading {
                        HStack {
                            Spacer()
                            ProgressView("Loading details…")
                            Spacer()
                        }
                        .padding(.vertical, 20)
                    } else if let error {
                        HStack {
                            Image(systemName: "exclamationmark.triangle.fill")
                                .foregroundStyle(.orange)
                            Text(error)
                                .font(.subheadline)
                        }
                        .padding()
                        .background(
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(Color.orange.opacity(0.08))
                        )
                    } else {
                        // Specs grid
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Specifications")
                                .font(.headline)

                            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                                DetailCell(label: "Power", value: connector.powerLabel, icon: "bolt.fill", tint: .orange)
                                DetailCell(label: "Status", value: connector.status.rawValue.capitalized, icon: "circle.fill", tint: statusColor)
                                if let ocpi = ocpiConnector {
                                    DetailCell(label: "Standard", value: ocpi.standard, icon: "ev.plug.dc.ccs2", tint: .blue)
                                    if let format = ocpi.format {
                                        DetailCell(label: "Format", value: format, icon: "cable.connector", tint: .purple)
                                    }
                                    if let powerType = ocpi.powerType {
                                        DetailCell(label: "Power Type", value: powerType, icon: "bolt.horizontal.fill", tint: .green)
                                    }
                                    DetailCell(label: "Available", value: ocpi.available == true ? "Yes" : "No", icon: "checkmark.circle.fill", tint: ocpi.available == true ? .green : .gray)
                                }
                            }
                        }

                        // Pricing / Tariffs
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Current Pricing")
                                .font(.headline)

                            HStack(spacing: 10) {
                                Image(systemName: "dollarsign.circle.fill")
                                    .foregroundStyle(.green)
                                Text(pricingSummary)
                                    .font(.subheadline.weight(.semibold))
                                Spacer()
                            }
                            .padding(10)
                            .background(
                                RoundedRectangle(cornerRadius: 10, style: .continuous)
                                    .fill(Color.green.opacity(0.08))
                            )
                        }

                        if let tariffIds = ocpiConnector?.tariffIds, !tariffIds.isEmpty {
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Pricing & Tariffs")
                                    .font(.headline)

                                ForEach(tariffIds, id: \.self) { tariffId in
                                    HStack(spacing: 10) {
                                        Image(systemName: "tag.fill")
                                            .foregroundStyle(.blue)
                                            .font(.caption)
                                        Text(tariffId)
                                            .font(.subheadline.monospaced())
                                            .lineLimit(1)
                                            .truncationMode(.middle)
                                        Spacer()
                                    }
                                    .padding(10)
                                    .background(
                                        RoundedRectangle(cornerRadius: 10, style: .continuous)
                                            .fill(Color.blue.opacity(0.06))
                                    )
                                }
                            }
                        }

                        VStack(alignment: .leading, spacing: 10) {
                            if let actionFeedback {
                                Text(actionFeedback)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }

                            Button {
                                Task { await startCharging() }
                            } label: {
                                Label("Start Charging", systemImage: "play.circle.fill")
                                    .frame(maxWidth: .infinity)
                            }
                            .buttonStyle(.borderedProminent)
                            .controlSize(.large)
                            .tint(.green)
                            .disabled(isStarting || !canStartCharging)

                            if !canStartCharging, let reason = startDisabledReason {
                                Text(reason)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                }
                .padding(20)
            }
            .background(Color(red: 0.96, green: 0.97, blue: 0.99))
            .navigationTitle("Connector Details")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private var statusColor: Color {
        switch connector.status {
        case .available: return .green
        case .charging: return .blue
        case .faulted: return .red
        case .offline: return .gray
        case .reserved: return .purple
        }
    }

    private var connectorIcon: String {
        switch connector.type {
        case .ccs2: return "ev.plug.dc.ccs2"
        case .chademo: return "ev.plug.dc.chademo"
        case .type2: return "ev.plug.ac.type.2"
        case .type1: return "ev.plug.ac.type.1"
        }
    }

    private var canStartCharging: Bool {
        guard sessionStore.isAuthenticated else { return false }
        if let ocpiConnector {
            return ocpiConnector.available ?? connector.status == .available
        }
        return connector.status == .available
    }

    private var startDisabledReason: String? {
        if !sessionStore.isAuthenticated {
            return "Sign in to start a charging session."
        }
        if !canStartCharging {
            return "Start Charging is available only when this connector is in AVAILABLE state."
        }
        return nil
    }

    private var pricingSummary: String {
        guard let tariff = resolvedTariff else {
            return "Pricing unavailable. The applicable tariff could not be resolved."
        }

        var chunks: [String] = []
        if let energyPrice = tariff.energyPrice {
            chunks.append("\(formatMoney(energyPrice, currency: tariff.currency))/kWh")
        }
        if let timePrice = tariff.timePrice {
            chunks.append("\(formatMoney(timePrice, currency: tariff.currency))/min")
        }
        if let flatFee = tariff.flatFee {
            chunks.append("\(formatMoney(flatFee, currency: tariff.currency)) session fee")
        }

        if chunks.isEmpty {
            return "Tariff available (\(tariff.tariffId)), but no numeric price components were returned."
        }
        return chunks.joined(separator: " + ")
    }

    private var resolvedTariff: OcpiTariff? {
        if let connectorTariff = ocpiConnector?.tariffs?.first {
            return connectorTariff
        }
        return nil
    }

    private func formatMoney(_ value: Double, currency: String?) -> String {
        let code = currency?.isEmpty == false ? currency! : "USD"
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = code
        return formatter.string(from: NSNumber(value: value)) ?? "\(value)"
    }

    private func startCharging() async {
        guard canStartCharging else { return }
        isStarting = true
        defer { isStarting = false }

        let payload = StartChargingRequest(
            chargerId: chargerId,
            locationId: locationId,
            connectorId: connector.id,
            connectorNumber: extractConnectorNumber(connector.id),
            connectorType: connector.typeLabel,
            paymentMethod: "WALLET",
            idToken: sessionStore.userId,
            idTokenType: nil,
            authMethod: nil,
            idempotencyKey: UUID().uuidString,
            currency: "USD"
        )

        do {
            let response = try await chargingSessionService.startSession(payload: payload)
            actionFeedback = response.message
            onSessionStarted(response.sessionId)
        } catch {
            actionFeedback = "Unable to start charging: \(error.localizedDescription)"
        }
    }

    private func extractConnectorNumber(_ connectorID: String) -> Int? {
        let digits = connectorID.filter(\.isNumber)
        return Int(digits)
    }
}

private struct DetailCell: View {
    let label: String
    let value: String
    let icon: String
    let tint: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.caption2)
                    .foregroundStyle(tint)
                Text(label)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            Text(value)
                .font(.subheadline.weight(.semibold))
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 12, style: .continuous)
                .fill(.white)
                .shadow(color: .black.opacity(0.04), radius: 6, y: 3)
        )
    }
}

// MARK: - View Model

@MainActor
final class StationMapViewModel: ObservableObject {
    @Published var stations: [StationLocation] = []
    @Published var isLoading = false
    @Published var error: String?

    /// Primary loader: fetches OCPI chargers from the GraphQL API.
    /// Falls back to the REST station service (then sample data) if the GraphQL call fails.
    func loadChargers(service: ChargerGraphQLService, fallbackService: StationService) async {
        guard !isLoading else { return }
        isLoading = true
        error = nil

        do {
            stations = try await service.getChargerStations(countryCode: "US", limit: 50, offset: 0)
        } catch {
            // Attempt REST fallback
            do {
                stations = try await fallbackService.getAllStations()
            } catch {
                // Last resort: sample data for development
                stations = StationLocation.samples
                self.error = nil
            }
        }

        isLoading = false
    }

    /// Legacy loader kept for backward compatibility.
    func loadStations(service: StationService) async {
        guard !isLoading else { return }
        isLoading = true
        error = nil

        do {
            stations = try await service.getAllStations()
        } catch {
            stations = StationLocation.samples
            self.error = nil
        }

        isLoading = false
    }
}
