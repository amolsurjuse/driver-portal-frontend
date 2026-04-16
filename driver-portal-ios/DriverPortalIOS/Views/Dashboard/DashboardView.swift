import Charts
import SwiftUI

private struct DashboardMetric: Identifiable {
    let id = UUID()
    let title: String
    let value: String
    let subtitle: String
    let tint: Color
    let symbol: String
}

struct DashboardView: View {
    let paymentService: PaymentService
    let chargingSessionService: ChargingSessionService

    @State private var walletBalanceText = "$96.40"
    @State private var walletMeta = "Available credit"
    @State private var dashboardError: String?
    @State private var refreshing = false
    @State private var activeSession: LiveChargingSession?
    @State private var impact: EnvironmentalImpact = .calculate(totalEnergyKwh: 428.6)

    private var metrics: [DashboardMetric] {
        [
            DashboardMetric(
                title: "Energy used (total)",
                value: String(format: "%.1f kWh", impact.totalEnergyKwh),
                subtitle: "Updated now",
                tint: .orange,
                symbol: "bolt.fill"
            ),
            DashboardMetric(
                title: "Last charging date",
                value: "Feb 21, 2026",
                subtitle: "Last session",
                tint: ChargingTheme.neonBlue,
                symbol: "calendar"
            ),
            DashboardMetric(
                title: "Wallet balance",
                value: walletBalanceText,
                subtitle: walletMeta,
                tint: ChargingTheme.neonCyan,
                symbol: "wallet.bifold.fill"
            ),
            DashboardMetric(
                title: "Total savings",
                value: "$184.25",
                subtitle: "With subscriptions",
                tint: ChargingTheme.neonGreen,
                symbol: "dollarsign.circle.fill"
            )
        ]
    }

    var body: some View {
        ZStack {
            SpaceBackground()

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        HStack(spacing: 10) {
                            ElectraHubLogo(size: 32, style: .detailed)
                            Text("ElectraHub")
                                .font(.headline.weight(.semibold))
                                .foregroundStyle(ChargingTheme.brightText)
                        }
                        Text("Dashboard")
                            .font(.system(size: 30, weight: .bold, design: .rounded))
                            .foregroundStyle(ChargingTheme.brightText)
                        Text("Charging activity and wallet health")
                            .font(.subheadline)
                            .foregroundStyle(ChargingTheme.dimText)
                    }

                    // Live session widget (shown when a session is active)
                    if let session = activeSession, session.isActive {
                        LiveSessionWidget(session: session)
                    }

                    // Metrics grid
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                        ForEach(metrics) { metric in
                            PortalCard {
                                VStack(alignment: .leading, spacing: 14) {
                                    ZStack {
                                        Circle()
                                            .fill(metric.tint.opacity(0.12))
                                            .frame(width: 44, height: 44)
                                        Image(systemName: metric.symbol)
                                            .foregroundStyle(metric.tint)
                                    }

                                    Text(metric.title)
                                        .font(.subheadline)
                                        .foregroundStyle(ChargingTheme.dimText)

                                    Text(metric.value)
                                        .font(.title3.weight(.bold))
                                        .foregroundStyle(ChargingTheme.brightText)
                                        .minimumScaleFactor(0.7)

                                    Text(metric.subtitle)
                                        .font(.footnote)
                                        .foregroundStyle(ChargingTheme.dimText)
                                }
                                .frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                    }

                    // CO2 Savings card
                    CO2SavingsCard(impact: impact)

                    // Charging trend chart
                    PortalCard {
                        VStack(alignment: .leading, spacing: 16) {
                            HStack(alignment: .top) {
                                VStack(alignment: .leading, spacing: 6) {
                                    Text("Charging trend")
                                        .font(.title3.weight(.bold))
                                        .foregroundStyle(ChargingTheme.brightText)
                                    Text("Price and energy consumed across completed sessions in the last 12 months.")
                                        .foregroundStyle(ChargingTheme.dimText)
                                }

                                Spacer()

                                Button {
                                    Task { await refreshAll() }
                                } label: {
                                    Image(systemName: "arrow.clockwise")
                                }
                                .disabled(refreshing)
                            }

                            Chart {
                                ForEach(UsagePoint.lastYear) { point in
                                    AreaMark(
                                        x: .value("Month", point.month),
                                        y: .value("Energy", point.energyKwh)
                                    )
                                    .foregroundStyle(
                                        LinearGradient(
                                            colors: [ChargingTheme.neonCyan.opacity(0.25), ChargingTheme.neonCyan.opacity(0.02)],
                                            startPoint: .top,
                                            endPoint: .bottom
                                        )
                                    )

                                    LineMark(
                                        x: .value("Month", point.month),
                                        y: .value("Energy", point.energyKwh)
                                    )
                                    .foregroundStyle(ChargingTheme.neonCyan)
                                    .lineStyle(.init(lineWidth: 3, lineCap: .round))

                                    LineMark(
                                        x: .value("Month", point.month),
                                        y: .value("Price", point.priceUsd)
                                    )
                                    .foregroundStyle(ChargingTheme.neonGreen)
                                    .lineStyle(.init(lineWidth: 3, lineCap: .round))
                                    .interpolationMethod(.catmullRom)
                                }
                            }
                            .frame(height: 260)
                            .chartYAxis {
                                AxisMarks(position: .leading)
                            }

                            HStack(spacing: 18) {
                                Label("Energy (kWh)", systemImage: "bolt.fill")
                                    .foregroundStyle(ChargingTheme.neonCyan)
                                Label("Price (USD)", systemImage: "dollarsign")
                                    .foregroundStyle(ChargingTheme.neonGreen)
                            }
                            .font(.footnote.weight(.semibold))

                            if let dashboardError {
                                Text(dashboardError)
                                    .font(.footnote)
                                    .foregroundStyle(.red)
                            }
                        }
                    }
                }
                .padding(20)
            }
        }
        .navigationTitle("Driver Portal")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                NavigationLink {
                    NotificationsView()
                } label: {
                    Image(systemName: "bell.badge.fill")
                        .symbolRenderingMode(.palette)
                        .foregroundStyle(.red, ChargingTheme.neonCyan)
                }
            }
        }
        .refreshable {
            await refreshAll()
        }
        .task {
            await refreshAll()
        }
    }

    @MainActor
    private func refreshAll() async {
        guard !refreshing else { return }
        refreshing = true
        defer { refreshing = false }

        async let walletTask: Void = refreshWalletBalance()
        async let sessionTask: Void = refreshActiveSession()
        _ = await (walletTask, sessionTask)
    }

    @MainActor
    private func refreshWalletBalance() async {
        do {
            let state = try await paymentService.getState()
            walletBalanceText = PortalFormatters.currency(
                state.wallet.balance,
                code: state.wallet.currency,
                fallbackSymbol: state.wallet.currencySymbol
            )
            walletMeta = "Available credit"
            dashboardError = nil
        } catch {
            walletMeta = "Unable to refresh"
            dashboardError = error.localizedDescription
        }
    }

    @MainActor
    private func refreshActiveSession() async {
        do {
            let sessions = try await chargingSessionService.getActiveSessions()
            activeSession = sessions.first
        } catch {
            activeSession = LiveChargingSession.sample
        }
    }
}

// MARK: - Live Session Widget

private struct LiveSessionWidget: View {
    let session: LiveChargingSession
    @State private var pulseAnimation = false

    var body: some View {
        PortalCard {
            HStack(spacing: 14) {
                ZStack {
                    Circle()
                        .fill(ChargingTheme.neonGreen.opacity(0.12))
                        .frame(width: 50, height: 50)
                        .scaleEffect(pulseAnimation ? 1.15 : 1.0)
                        .animation(.easeInOut(duration: 1.0).repeatForever(autoreverses: true), value: pulseAnimation)

                    Image(systemName: "bolt.car.fill")
                        .font(.title3.weight(.bold))
                        .foregroundStyle(ChargingTheme.neonGreen)
                }
                .onAppear { pulseAnimation = true }

                VStack(alignment: .leading, spacing: 4) {
                    Text("Charging Now")
                        .font(.subheadline.weight(.bold))
                        .foregroundStyle(ChargingTheme.neonGreen)

                    Text(session.stationName)
                        .font(.footnote)
                        .foregroundStyle(ChargingTheme.dimText)
                        .lineLimit(1)

                    HStack(spacing: 12) {
                        Label(String(format: "%.1f kW", session.currentPowerKw), systemImage: "bolt.fill")
                        Label(String(format: "%.1f kWh", session.energyDeliveredKwh), systemImage: "battery.75percent")
                        if let pct = session.batteryPercent {
                            Label("\(pct)%", systemImage: "fuelpump.fill")
                        }
                    }
                    .font(.caption.weight(.medium))
                    .foregroundStyle(ChargingTheme.brightText)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 4) {
                    Text(String(format: "$%.2f", session.estimatedCost))
                        .font(.title3.weight(.bold))
                        .foregroundStyle(ChargingTheme.brightText)
                    if let mins = session.estimatedTimeRemainingMin {
                        Text("\(mins) min left")
                            .font(.caption)
                            .foregroundStyle(ChargingTheme.dimText)
                    }
                }
            }
        }
    }
}

// MARK: - CO2 Savings Card

private struct CO2SavingsCard: View {
    let impact: EnvironmentalImpact

    var body: some View {
        PortalCard {
            VStack(alignment: .leading, spacing: 14) {
                HStack {
                    ZStack {
                        Circle()
                            .fill(ChargingTheme.neonGreen.opacity(0.12))
                            .frame(width: 44, height: 44)
                        Image(systemName: "leaf.fill")
                            .foregroundStyle(ChargingTheme.neonGreen)
                    }
                    Text("Environmental Impact")
                        .font(.title3.weight(.bold))
                        .foregroundStyle(ChargingTheme.brightText)
                }

                HStack(spacing: 0) {
                    ImpactStat(
                        value: String(format: "%.0f kg", impact.co2SavedKg),
                        label: "CO\u{2082} Saved",
                        icon: "cloud.fill",
                        tint: .teal
                    )
                    ImpactStat(
                        value: String(format: "%.0f", impact.treesEquivalent),
                        label: "Trees Equiv.",
                        icon: "tree.fill",
                        tint: ChargingTheme.neonGreen
                    )
                    ImpactStat(
                        value: String(format: "%.0f L", impact.gasolineSavedLiters),
                        label: "Gas Saved",
                        icon: "fuelpump.slash.fill",
                        tint: .orange
                    )
                }
            }
        }
    }
}

private struct ImpactStat: View {
    let value: String
    let label: String
    let icon: String
    let tint: Color

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(tint)
            Text(value)
                .font(.subheadline.weight(.bold))
                .foregroundStyle(ChargingTheme.brightText)
            Text(label)
                .font(.caption2)
                .foregroundStyle(ChargingTheme.dimText)
        }
        .frame(maxWidth: .infinity)
    }
}
