import MapKit
import SwiftUI

// MARK: - Station Map View

struct StationMapView: View {
    let stationService: StationService

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

            // Floating station count pill
            if !viewModel.stations.isEmpty {
                HStack(spacing: 6) {
                    Image(systemName: "ev.plug.dc.ccs2")
                        .font(.caption.weight(.bold))
                    Text("\(viewModel.stations.count) stations nearby")
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
                    Text("Finding stations…")
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
                        Task { await viewModel.loadStations(service: stationService) }
                    }
                    .buttonStyle(.borderedProminent)
                    .controlSize(.small)
                }
                .padding(16)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16))
                .padding()
            }
        }
        .navigationTitle("Stations")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showDetail) {
            if let station = selectedStation {
                StationDetailSheet(station: station)
                    .presentationDetents([.medium, .large])
                    .presentationDragIndicator(.visible)
            }
        }
        .task {
            await viewModel.loadStations(service: stationService)
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
    @Environment(\.dismiss) private var dismiss

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
                        StatBox(value: "\(station.totalConnectors)", label: "Total", tint: .blue)
                        StatBox(value: "\(station.connectors.first?.power ?? 0) kW", label: "Max Power", tint: .orange)
                    }

                    // Connectors list
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Connectors")
                            .font(.headline)

                        ForEach(station.connectors) { connector in
                            ConnectorRow(connector: connector)
                        }
                    }

                    // Actions
                    VStack(spacing: 12) {
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
        }
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

// MARK: - View Model

@MainActor
final class StationMapViewModel: ObservableObject {
    @Published var stations: [StationLocation] = []
    @Published var isLoading = false
    @Published var error: String?

    func loadStations(service: StationService) async {
        guard !isLoading else { return }
        isLoading = true
        error = nil

        do {
            stations = try await service.getAllStations()
        } catch {
            // Fallback to sample data for development
            stations = StationLocation.samples
            self.error = nil // Suppress error when using samples
        }

        isLoading = false
    }
}
