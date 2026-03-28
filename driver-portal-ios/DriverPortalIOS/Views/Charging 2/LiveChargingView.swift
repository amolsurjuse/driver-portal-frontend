import SwiftUI

// MARK: - Live Charging View

struct LiveChargingView: View {
    let chargingSessionService: ChargingSessionService

    @StateObject private var viewModel = LiveChargingViewModel()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                if viewModel.isLoading && viewModel.activeSession == nil {
                    SkeletonLoadingView()
                } else if let session = viewModel.activeSession {
                    ZStack {
                        // Subtle ambient energy field when charging
                        ChargingEnergyField(isCharging: session.isActive)

                        VStack(spacing: 20) {
                            ActiveSessionCard(
                                session: session,
                                meterEventCount: viewModel.meterEventCount,
                                onStop: {
                                    Task { await viewModel.stopSession(service: chargingSessionService) }
                                }
                            )

                            // SSE connection status
                            SSEStatusBadge(state: viewModel.sseState)
                        }

                        // Electrifying animation overlay — fires on every meter value
                        ElectrifyingOverlay(triggerCount: viewModel.meterEventCount)
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
        .background(Color(red: 0.96, green: 0.97, blue: 0.99))
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

// MARK: - SSE Connection State Badge

enum SSEConnectionState: String {
    case disconnected = "Disconnected"
    case connecting = "Connecting"
    case streaming = "Live Stream"
    case fallbackPolling = "Polling"
}

private struct SSEStatusBadge: View {
    let state: SSEConnectionState

    var body: some View {
        HStack(spacing: 6) {
            Circle()
                .fill(dotColor)
                .frame(width: 6, height: 6)
            Text(state.rawValue)
                .font(.caption2.weight(.semibold))
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 5)
        .background(dotColor.opacity(0.1), in: Capsule())
        .foregroundStyle(dotColor)
        .accessibilityLabel("Connection status: \(state.rawValue)")
    }

    private var dotColor: Color {
        switch state {
        case .streaming: return .green
        case .connecting: return .orange
        case .fallbackPolling: return .blue
        case .disconnected: return .gray
        }
    }
}

// MARK: - Active Session Card

private struct ActiveSessionCard: View {
    let session: LiveChargingSession
    let meterEventCount: Int
    let onStop: () -> Void

    @State private var pulseAnimation = false
    @State private var valueFlash = false
    @State private var showStopConfirmation = false

    var body: some View {
        VStack(spacing: 20) {
            // Status header
            HStack {
                HStack(spacing: 8) {
                    Circle()
                        .fill(statusColor)
                        .frame(width: 10, height: 10)
                        .scaleEffect(pulseAnimation ? 1.3 : 1.0)
                        .animation(.easeInOut(duration: 1.0).repeatForever(autoreverses: true), value: pulseAnimation)

                    Text(session.status.rawValue.capitalized)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(statusColor)
                }

                Spacer()

                Text(session.stationName)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
            .onAppear { pulseAnimation = true }
            .accessibilityElement(children: .combine)
            .accessibilityLabel("Status: \(session.status.rawValue), Station: \(session.stationName)")

            // Power gauge with pulse ring
            ZStack {
                PowerPulseRing(powerKw: session.currentPowerKw, maxPower: 350)
                    .frame(width: 200, height: 200)

                PowerGaugeView(currentPowerKw: session.currentPowerKw, energyFlash: valueFlash)
            }

            // Metrics grid — values flash cyan on update
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 14) {
                MetricTile(
                    icon: "bolt.fill",
                    label: "Energy",
                    value: String(format: "%.1f kWh", session.energyDeliveredKwh),
                    tint: .blue,
                    flash: valueFlash
                )
                MetricTile(
                    icon: "dollarsign.circle.fill",
                    label: "Cost",
                    value: String(format: "$%.2f", session.estimatedCost),
                    tint: .green,
                    flash: valueFlash
                )
                MetricTile(
                    icon: "battery.75percent",
                    label: "Battery",
                    value: session.batteryPercent.map { "\($0)%" } ?? "—",
                    tint: .orange,
                    flash: valueFlash
                )
                MetricTile(
                    icon: "clock.fill",
                    label: "Time Left",
                    value: session.estimatedTimeRemainingMin.map { "\($0) min" } ?? "—",
                    tint: .purple,
                    flash: valueFlash
                )
            }

            // Connector info
            HStack {
                Label(session.connectorType, systemImage: "ev.plug.dc.ccs2")
                    .font(.caption.weight(.medium))
                Spacer()
                Text("Connector \(session.connectorId)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 4)

            // Stop button with confirmation
            if session.isActive {
                Button(role: .destructive) {
                    Haptics.warning()
                    showStopConfirmation = true
                } label: {
                    Label("Stop Charging", systemImage: "stop.circle.fill")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                .tint(.red)
                .confirmationDialog(
                    "Stop Charging?",
                    isPresented: $showStopConfirmation,
                    titleVisibility: .visible
                ) {
                    Button("Stop Charging", role: .destructive) {
                        onStop()
                    }
                    Button("Continue Charging", role: .cancel) {}
                } message: {
                    Text("This will end your session at \(session.stationName). \(String(format: "%.1f kWh", session.energyDeliveredKwh)) delivered so far.")
                }
            }
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.white)
                .shadow(color: .black.opacity(0.06), radius: 22, x: 0, y: 14)
        )
        .onChange(of: meterEventCount) { _, _ in
            // Flash the metric tiles on every meter value
            withAnimation(.easeIn(duration: 0.1)) {
                valueFlash = true
            }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                withAnimation(.easeOut(duration: 0.4)) {
                    valueFlash = false
                }
            }
        }
    }

    private var statusColor: Color {
        switch session.status {
        case .charging: return .green
        case .preparing: return .blue
        case .suspended: return .orange
        case .finishing: return .purple
        case .completed: return .gray
        }
    }
}

// MARK: - Power Gauge (enhanced with flash ring on meter events)

private struct PowerGaugeView: View {
    let currentPowerKw: Double
    var energyFlash: Bool = false
    private let maxPower: Double = 350

    var body: some View {
        VStack(spacing: 8) {
            ZStack {
                // Background arc
                Circle()
                    .trim(from: 0.15, to: 0.85)
                    .stroke(Color.gray.opacity(0.12), style: StrokeStyle(lineWidth: 14, lineCap: .round))

                // Power arc
                Circle()
                    .trim(from: 0.15, to: 0.15 + 0.7 * min(currentPowerKw / maxPower, 1.0))
                    .stroke(
                        LinearGradient(
                            colors: [.green, .cyan, .blue, .purple],
                            startPoint: .leading,
                            endPoint: .trailing
                        ),
                        style: StrokeStyle(lineWidth: 14, lineCap: .round)
                    )
                    .animation(.spring(duration: 0.8), value: currentPowerKw)

                // Flash ring on meter value event
                Circle()
                    .trim(from: 0.15, to: 0.85)
                    .stroke(Color.cyan.opacity(energyFlash ? 0.6 : 0), style: StrokeStyle(lineWidth: 20, lineCap: .round))
                    .scaleEffect(energyFlash ? 1.08 : 1.0)
                    .blur(radius: energyFlash ? 8 : 0)

                VStack(spacing: 4) {
                    Text(String(format: "%.1f", currentPowerKw))
                        .font(.system(size: 42, weight: .bold, design: .rounded))
                        .foregroundStyle(energyFlash ? .cyan : .primary)
                        .contentTransition(.numericText())
                        .animation(.easeInOut(duration: 0.3), value: energyFlash)
                    Text("kW")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)
                }
            }
            .frame(width: 180, height: 180)
            .accessibilityElement(children: .ignore)
            .accessibilityLabel("Current power: \(String(format: "%.1f", currentPowerKw)) kilowatts")
        }
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Metric Tile (with flash support)

private struct MetricTile: View {
    let icon: String
    let label: String
    let value: String
    let tint: Color
    var flash: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            ZStack {
                Circle()
                    .fill(tint.opacity(flash ? 0.3 : 0.12))
                    .frame(width: 34, height: 34)
                Image(systemName: icon)
                    .font(.system(size: 14, weight: .bold))
                    .foregroundStyle(tint)
            }

            Text(label)
                .font(.caption)
                .foregroundStyle(.secondary)

            Text(value)
                .font(.title3.weight(.bold))
                .foregroundStyle(flash ? .cyan : .primary)
                .minimumScaleFactor(0.7)
                .lineLimit(1)
                .contentTransition(.numericText())
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(Color(red: 0.96, green: 0.97, blue: 0.99))
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .stroke(Color.cyan.opacity(flash ? 0.4 : 0), lineWidth: 1.5)
                )
        )
        .animation(.easeInOut(duration: 0.3), value: flash)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(label): \(value)")
    }
}

// MARK: - Error State

private struct ErrorStateView: View {
    let message: String
    let onRetry: () -> Void

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 48))
                .foregroundStyle(.orange)

            Text("Something went wrong")
                .font(.title3.weight(.bold))

            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
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
            .tint(.blue)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 60)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.white)
                .shadow(color: .black.opacity(0.04), radius: 16, y: 8)
        )
    }
}

// MARK: - No Active Session

private struct NoActiveSessionView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "ev.plug.dc.ccs2")
                .font(.system(size: 56))
                .foregroundStyle(.tertiary)

            Text("No Active Session")
                .font(.title3.weight(.bold))

            Text("Start a charging session at any Electra Hub station to see live progress here.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 60)
        .background(
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(.white)
                .shadow(color: .black.opacity(0.04), radius: 16, y: 8)
        )
    }
}

// MARK: - Skeleton Loading

private struct SkeletonLoadingView: View {
    @State private var shimmer = false

    var body: some View {
        VStack(spacing: 16) {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.gray.opacity(shimmer ? 0.15 : 0.08))
                .frame(height: 200)

            HStack(spacing: 14) {
                ForEach(0..<4, id: \.self) { _ in
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.gray.opacity(shimmer ? 0.15 : 0.08))
                        .frame(height: 90)
                }
            }

            RoundedRectangle(cornerRadius: 12)
                .fill(Color.gray.opacity(shimmer ? 0.15 : 0.08))
                .frame(height: 50)
        }
        .animation(.easeInOut(duration: 1.2).repeatForever(autoreverses: true), value: shimmer)
        .onAppear { shimmer = true }
    }
}

// MARK: - View Model (SSE-driven with polling fallback)

@MainActor
final class LiveChargingViewModel: ObservableObject {
    @Published var activeSession: LiveChargingSession?
    @Published var isLoading = false
    @Published var error: String?
    @Published var sseState: SSEConnectionState = .disconnected
    /// Incremented on every meter-value SSE event; drives the electrifying animation.
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
            // Fallback to sample for development
            activeSession = LiveChargingSession.sample
            self.error = nil
        }

        isLoading = false

        // Connect to SSE stream if there's an active session
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

    // MARK: - SSE Connection

    private func connectSSE(sessionId: String, service: ChargingSessionService) {
        // Cancel any existing connection
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

            // If SSE disconnects, fall back to polling
            if !Task.isCancelled {
                sseState = .fallbackPolling
                startPollingFallback(service: service)
            }
        }
    }

    private func handleSSEEvent(_ event: SSEEvent, service: ChargingSessionService) {
        switch event.event {
        case "meterValue", "meter_value", "MeterValues":
            // Parse the meter value data and update the session
            guard let data = event.data.data(using: .utf8),
                  let meterValue = try? JSONDecoder().decode(MeterValueEvent.self, from: data) else {
                return
            }

            // Update session from meter value
            activeSession = meterValue.toLiveSession(fallback: activeSession)

            // Increment trigger counter — this fires the electrifying animation
            meterEventCount += 1

            // Haptic pulse on every meter value
            Haptics.impact(.light)

            // If session ended, disconnect
            if meterValue.status == "COMPLETED" || meterValue.status == "FINISHING" {
                disconnectSSE(service: service)
            }

        case "statusUpdate", "status_update":
            guard let data = event.data.data(using: .utf8),
                  let meterValue = try? JSONDecoder().decode(MeterValueEvent.self, from: data) else {
                return
            }
            activeSession = meterValue.toLiveSession(fallback: activeSession)

            if meterValue.status == "COMPLETED" {
                disconnectSSE(service: service)
            }

        case "heartbeat", "ping":
            // Keep-alive, ignore
            break

        default:
            break
        }
    }

    // MARK: - Polling Fallback

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

                    // If energy changed, treat it like a meter value event
                    if let current = activeSession, let prev = previous,
                       current.energyDeliveredKwh != prev.energyDeliveredKwh {
                        meterEventCount += 1
                        Haptics.impact(.light)
                    }

                    if activeSession?.isActive != true {
                        break
                    }
                } catch {
                    break
                }
            }
        }
    }
}
