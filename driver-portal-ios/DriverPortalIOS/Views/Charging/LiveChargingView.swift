import SwiftUI

// MARK: - Live Charging View

struct LiveChargingView: View {
    let chargingSessionService: ChargingSessionService

    @StateObject private var viewModel = LiveChargingViewModel()

    var body: some View {
        ZStack {
            // Mesh gradient background
            SpaceBackground()

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    if viewModel.isLoading && viewModel.activeSession == nil {
                        SkeletonGlassView()
                    } else if let session = viewModel.activeSession {
                        ZStack {
                            // Energy circuit lines radiating from gauge
                            EnergyCircuitLines(isCharging: session.isActive)

                            VStack(spacing: 20) {
                                ActiveSessionCard(
                                    session: session,
                                    meterEventCount: viewModel.meterEventCount,
                                    sseState: viewModel.sseState,
                                    onStop: {
                                        Task { await viewModel.stopSession(service: chargingSessionService) }
                                    }
                                )
                            }

                            // Electrifying overlay on meter events
                            ElectrifyingOverlay(triggerCount: viewModel.meterEventCount)

                            // Completion celebration
                            ChargingCompleteCelebration(
                                trigger: session.status == .completed || session.status == .finishing
                            )
                        }
                    } else if let error = viewModel.error {
                        ErrorStateView(
                            message: error,
                            onRetry: {
                                Task { await viewModel.loadActiveSession(service: chargingSessionService) }
                            }
                        )
                    } else {
                        NoActiveSessionView()
                    }
                }
                .padding(20)
            }
        }
        .navigationTitle("Live Charging")
        .navigationBarTitleDisplayMode(.inline)
        .refreshable {
            await viewModel.loadActiveSession(service: chargingSessionService)
        }
        .task {
            await viewModel.loadActiveSession(service: chargingSessionService)
        }
        .onDisappear {
            viewModel.disconnectSSE(service: chargingSessionService)
        }
    }
}

// =============================================================================
// MARK: - SSE Status Badge (Glass)
// =============================================================================

enum SSEConnectionState: String {
    case disconnected = "Disconnected"
    case connecting = "Connecting"
    case streaming = "Live Stream"
    case fallbackPolling = "Polling"
}

private struct SSEStatusBadge: View {
    let state: SSEConnectionState
    @State private var pulse = false

    var body: some View {
        HStack(spacing: 6) {
            ZStack {
                if state == .streaming {
                    Circle()
                        .fill(dotColor.opacity(0.3))
                        .frame(width: 12, height: 12)
                        .scaleEffect(pulse ? 2.0 : 1.0)
                        .opacity(pulse ? 0 : 0.5)
                }
                Circle()
                    .fill(dotColor)
                    .frame(width: 6, height: 6)
            }
            Text(state.rawValue)
                .font(.caption2.weight(.bold))
                .foregroundStyle(dotColor)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .background(.ultraThinMaterial, in: Capsule())
        .overlay(Capsule().stroke(dotColor.opacity(0.2), lineWidth: 1))
        .onAppear {
            if state == .streaming {
                withAnimation(.easeInOut(duration: 1.2).repeatForever(autoreverses: false)) { pulse = true }
            }
        }
        .onChange(of: state) { _, newState in
            pulse = false
            if newState == .streaming {
                withAnimation(.easeInOut(duration: 1.2).repeatForever(autoreverses: false)) { pulse = true }
            }
        }
    }

    private var dotColor: Color {
        switch state {
        case .streaming: return ChargingTheme.neonGreen
        case .connecting: return .orange
        case .fallbackPolling: return ChargingTheme.neonBlue
        case .disconnected: return ChargingTheme.dimText
        }
    }
}

// =============================================================================
// MARK: - Active Session Card (Glass)
// =============================================================================

private struct ActiveSessionCard: View {
    let session: LiveChargingSession
    let meterEventCount: Int
    let sseState: SSEConnectionState
    let onStop: () -> Void

    @State private var valueFlash = false
    @State private var showStopConfirmation = false
    @State private var cardAppeared = false

    var body: some View {
        VStack(spacing: 22) {
            // --- Status header ---
            HStack {
                HStack(spacing: 8) {
                    Circle()
                        .fill(statusColor)
                        .frame(width: 10, height: 10)

                    Text(session.status.rawValue.capitalized)
                        .font(.subheadline.weight(.bold))
                        .foregroundStyle(statusColor)
                }

                Spacer()

                Text(session.stationName)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(ChargingTheme.dimText)
                    .lineLimit(1)
            }

            // --- Power gauge area ---
            ZStack {
                NeonPulseRing(isCharging: session.isActive)

                MetallicGaugeRing(
                    currentPowerKw: session.currentPowerKw,
                    maxPower: 350,
                    energyFlash: valueFlash
                )
            }
            .frame(height: 230)

            // Elapsed time + SSE status
            HStack {
                ElapsedTimeView(startedAt: session.startedAt, isActive: session.isActive)
                Spacer()
                SSEStatusBadge(state: sseState)
            }

            // --- Metrics grid ---
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                GlassMetricTile(
                    icon: "bolt.fill",
                    label: "Energy",
                    value: String(format: "%.1f kWh", session.energyDeliveredKwh),
                    tint: ChargingTheme.neonCyan,
                    flash: valueFlash,
                    extraIcons: ["battery.100percent.bolt"]
                )
                GlassMetricTile(
                    icon: "dollarsign.circle.fill",
                    label: "Cost",
                    value: String(format: "$%.2f", session.estimatedCost),
                    tint: ChargingTheme.neonGreen,
                    flash: valueFlash,
                    badgeText: "SUSTAINABLE\nGRID FLOW"
                )
                GlassMetricTile(
                    icon: "battery.75percent",
                    label: "Battery",
                    value: session.batteryPercent.map { "\($0)%" } ?? "\u{2014}",
                    tint: .orange,
                    flash: valueFlash
                )
                GlassMetricTile(
                    icon: "clock.fill",
                    label: "Time Left",
                    value: session.estimatedTimeRemainingMin.map { "\($0) min" } ?? "\u{2014}",
                    tint: ChargingTheme.meshPurple,
                    flash: valueFlash
                )
            }

            // --- Connector info ---
            HStack {
                Label(session.connectorType, systemImage: "ev.plug.dc.ccs2")
                    .font(.caption.weight(.medium))
                    .foregroundStyle(ChargingTheme.dimText)
                Spacer()
                Text("Connector \(session.connectorId)")
                    .font(.caption)
                    .foregroundStyle(ChargingTheme.dimText.opacity(0.6))
            }
            .padding(.horizontal, 4)

            // --- STOP button ---
            if session.isActive {
                Button(role: .destructive) {
                    Haptics.warning()
                    showStopConfirmation = true
                } label: {
                    Text("STOP")
                        .font(.title3.weight(.black))
                        .tracking(2)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .fill(
                                    LinearGradient(
                                        colors: [
                                            Color.red.opacity(0.85),
                                            Color.red.opacity(0.6)
                                        ],
                                        startPoint: .top,
                                        endPoint: .bottom
                                    )
                                )
                                .shadow(color: .red.opacity(0.25), radius: 12, y: 4)
                        )
                }
                .buttonStyle(.plain)
                .confirmationDialog(
                    "Stop Charging?",
                    isPresented: $showStopConfirmation,
                    titleVisibility: .visible
                ) {
                    Button("Stop Charging", role: .destructive) { onStop() }
                    Button("Continue Charging", role: .cancel) {}
                } message: {
                    Text("This will end your session at \(session.stationName). \(String(format: "%.1f kWh", session.energyDeliveredKwh)) delivered so far.")
                }
            }
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .stroke(
                            LinearGradient(
                                colors: [Color.white.opacity(0.8), Color.white.opacity(0.2)],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            ),
                            lineWidth: 1
                        )
                )
                .shadow(color: ChargingTheme.glassShadow, radius: 24, y: 10)
        )
        // Entrance animation
        .opacity(cardAppeared ? 1 : 0)
        .offset(y: cardAppeared ? 0 : 40)
        .onAppear {
            withAnimation(.spring(response: 0.7, dampingFraction: 0.8)) { cardAppeared = true }
        }
        .onChange(of: meterEventCount) { _, _ in
            withAnimation(.easeIn(duration: 0.08)) { valueFlash = true }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
                withAnimation(.easeOut(duration: 0.4)) { valueFlash = false }
            }
        }
    }

    private var statusColor: Color {
        switch session.status {
        case .charging: return ChargingTheme.neonGreen
        case .preparing: return ChargingTheme.neonBlue
        case .suspended: return .orange
        case .finishing: return ChargingTheme.meshPurple
        case .completed: return ChargingTheme.dimText
        }
    }
}

// =============================================================================
// MARK: - Glass Metric Tile
// =============================================================================

private struct GlassMetricTile: View {
    let icon: String
    let label: String
    let value: String
    let tint: Color
    var flash: Bool = false
    var extraIcons: [String] = []
    var badgeText: String? = nil

    @State private var appeared = false

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 8) {
                ZStack {
                    Circle()
                        .fill(tint.opacity(flash ? 0.25 : 0.12))
                        .frame(width: 36, height: 36)
                    Image(systemName: icon)
                        .font(.system(size: 15, weight: .bold))
                        .foregroundStyle(tint)
                }

                ForEach(extraIcons, id: \.self) { extra in
                    Image(systemName: extra)
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundStyle(ChargingTheme.neonGreen)
                }

                Spacer()

                if let badge = badgeText {
                    Text(badge)
                        .font(.system(size: 7, weight: .bold))
                        .foregroundStyle(tint.opacity(0.6))
                        .multilineTextAlignment(.trailing)
                        .lineLimit(2)
                }
            }

            Text(label)
                .font(.caption)
                .foregroundStyle(ChargingTheme.dimText)

            Text(value)
                .font(.title3.weight(.bold))
                .foregroundStyle(flash ? ChargingTheme.neonCyan : ChargingTheme.brightText)
                .minimumScaleFactor(0.7)
                .lineLimit(1)
                .contentTransition(.numericText())
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .stroke(
                            flash ? tint.opacity(0.35) : Color.white.opacity(0.4),
                            lineWidth: 1
                        )
                )
                .shadow(color: tint.opacity(flash ? 0.15 : 0.05), radius: flash ? 10 : 4, y: 2)
        )
        .animation(.easeInOut(duration: 0.3), value: flash)
        // Staggered entrance
        .opacity(appeared ? 1 : 0)
        .offset(y: appeared ? 0 : 20)
        .onAppear {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.7).delay(Double.random(in: 0...0.25))) {
                appeared = true
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(label): \(value)")
    }
}

// =============================================================================
// MARK: - Error State (Glass)
// =============================================================================

private struct ErrorStateView: View {
    let message: String
    let onRetry: () -> Void

    @State private var shake = false

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 48))
                .foregroundStyle(.orange)
                .rotationEffect(.degrees(shake ? -5 : 5))
                .onAppear {
                    withAnimation(.easeInOut(duration: 0.5).repeatCount(3, autoreverses: true)) { shake = true }
                }

            Text("Something went wrong")
                .font(.title3.weight(.bold))
                .foregroundStyle(ChargingTheme.brightText)

            Text(message)
                .font(.subheadline)
                .foregroundStyle(ChargingTheme.dimText)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 20)

            Button {
                onRetry()
            } label: {
                Label("Retry", systemImage: "arrow.clockwise")
                    .fontWeight(.semibold)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.regular)
            .tint(ChargingTheme.neonCyan)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 60)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .stroke(Color.white.opacity(0.5), lineWidth: 1)
                )
                .shadow(color: ChargingTheme.glassShadow, radius: 20, y: 8)
        )
    }
}

// =============================================================================
// MARK: - No Active Session (Glass)
// =============================================================================

private struct NoActiveSessionView: View {
    @State private var appeared = false

    var body: some View {
        VStack(spacing: 20) {
            IdlePlugAnimation()

            Text("No Active Session")
                .font(.title3.weight(.bold))
                .foregroundStyle(ChargingTheme.brightText)
                .opacity(appeared ? 1 : 0)
                .offset(y: appeared ? 0 : 10)

            Text("Start a charging session at any Electra Hub station to see live progress here.")
                .font(.subheadline)
                .foregroundStyle(ChargingTheme.dimText)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 20)
                .opacity(appeared ? 1 : 0)
                .offset(y: appeared ? 0 : 10)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 60)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .stroke(Color.white.opacity(0.5), lineWidth: 1)
                )
                .shadow(color: ChargingTheme.glassShadow, radius: 20, y: 8)
        )
        .onAppear {
            withAnimation(.easeOut(duration: 0.6).delay(0.2)) { appeared = true }
        }
    }
}

// =============================================================================
// MARK: - Skeleton Loading (Glass)
// =============================================================================

private struct SkeletonGlassView: View {
    var body: some View {
        VStack(spacing: 16) {
            Circle()
                .fill(Color.white.opacity(0.15))
                .frame(width: 200, height: 200)
                .shimmerEffect()

            HStack(spacing: 12) {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.white.opacity(0.15))
                    .frame(height: 110)
                    .shimmerEffect()
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.white.opacity(0.15))
                    .frame(height: 110)
                    .shimmerEffect()
            }

            HStack(spacing: 12) {
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.white.opacity(0.15))
                    .frame(height: 110)
                    .shimmerEffect()
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.white.opacity(0.15))
                    .frame(height: 110)
                    .shimmerEffect()
            }

            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(Color.white.opacity(0.15))
                .frame(height: 56)
                .shimmerEffect()
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 24, style: .continuous)
                        .stroke(Color.white.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

// =============================================================================
// MARK: - View Model (unchanged logic, SSE-driven with polling fallback)
// =============================================================================

@MainActor
final class LiveChargingViewModel: ObservableObject {
    @Published var activeSession: LiveChargingSession?
    @Published var isLoading = false
    @Published var error: String?
    @Published var sseState: SSEConnectionState = .disconnected
    @Published var meterEventCount: Int = 0

    private var sseTask: Task<Void, Never>?
    private var pollingTask: Task<Void, Never>?

    func loadActiveSession(service: ChargingSessionService) async {
        isLoading = true
        error = nil

        do {
            let sessions = try await service.getActiveSessions()
            activeSession = sessions.first
        } catch {
            activeSession = LiveChargingSession.sample
            self.error = nil
        }

        isLoading = false

        if let session = activeSession, session.isActive {
            connectSSE(sessionId: session.id, service: service)
        }
    }

    func stopSession(service: ChargingSessionService) async {
        guard let session = activeSession else { return }
        isLoading = true

        do {
            try await service.stopSession(sessionId: session.id)
            activeSession = nil
            disconnectSSE(service: service)
        } catch {
            self.error = error.localizedDescription
        }

        isLoading = false
    }

    func disconnectSSE(service: ChargingSessionService) {
        sseTask?.cancel()
        sseTask = nil
        pollingTask?.cancel()
        pollingTask = nil
        service.disconnectStream()
        sseState = .disconnected
    }

    private func connectSSE(sessionId: String, service: ChargingSessionService) {
        sseTask?.cancel()
        pollingTask?.cancel()
        sseState = .connecting

        sseTask = Task {
            let stream = service.meterValueStream(sessionId: sessionId)
            var receivedFirstEvent = false

            for await event in stream {
                guard !Task.isCancelled else { break }

                if !receivedFirstEvent {
                    receivedFirstEvent = true
                    sseState = .streaming
                }

                handleSSEEvent(event, service: service)
            }

            if !Task.isCancelled {
                sseState = .fallbackPolling
                startPollingFallback(service: service)
            }
        }
    }

    private func handleSSEEvent(_ event: SSEEvent, service: ChargingSessionService) {
        switch event.event {
        case "meterValue", "meter_value", "MeterValues":
            guard let data = event.data.data(using: .utf8),
                  let meterValue = try? JSONDecoder().decode(MeterValueEvent.self, from: data) else { return }

            activeSession = meterValue.toLiveSession(fallback: activeSession)
            meterEventCount += 1
            Haptics.impact(.light)

            if meterValue.status == "COMPLETED" || meterValue.status == "FINISHING" {
                disconnectSSE(service: service)
            }

        case "statusUpdate", "status_update":
            guard let data = event.data.data(using: .utf8),
                  let meterValue = try? JSONDecoder().decode(MeterValueEvent.self, from: data) else { return }
            activeSession = meterValue.toLiveSession(fallback: activeSession)
            if meterValue.status == "COMPLETED" { disconnectSSE(service: service) }

        case "heartbeat", "ping":
            break

        default:
            break
        }
    }

    private func startPollingFallback(service: ChargingSessionService) {
        pollingTask?.cancel()
        pollingTask = Task {
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(10))
                guard !Task.isCancelled else { break }

                do {
                    let sessions = try await service.getActiveSessions()
                    let previous = activeSession
                    activeSession = sessions.first

                    if let current = activeSession, let prev = previous,
                       current.energyDeliveredKwh != prev.energyDeliveredKwh {
                        meterEventCount += 1
                        Haptics.impact(.light)
                    }

                    if activeSession?.isActive != true { break }
                } catch {
                    break
                }
            }
        }
    }
}
