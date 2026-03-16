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

    @State private var walletBalanceText = "$96.40"
    @State private var walletMeta = "Available credit"
    @State private var dashboardError: String?
    @State private var refreshing = false

    private var metrics: [DashboardMetric] {
        [
            DashboardMetric(
                title: "Energy used (total)",
                value: "428.6 kWh",
                subtitle: "Updated now",
                tint: .orange,
                symbol: "bolt.fill"
            ),
            DashboardMetric(
                title: "Last charging date",
                value: "Feb 21, 2026",
                subtitle: "Last session",
                tint: .indigo,
                symbol: "calendar"
            ),
            DashboardMetric(
                title: "Wallet balance",
                value: walletBalanceText,
                subtitle: walletMeta,
                tint: .blue,
                symbol: "wallet.bifold.fill"
            ),
            DashboardMetric(
                title: "Total savings",
                value: "$184.25",
                subtitle: "With subscriptions",
                tint: .green,
                symbol: "dollarsign.circle.fill"
            )
        ]
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Dashboard")
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                    Text("A quick snapshot of charging activity and wallet health.")
                        .foregroundStyle(.secondary)
                }

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    ForEach(metrics) { metric in
                        PortalCard {
                            VStack(alignment: .leading, spacing: 14) {
                                ZStack {
                                    Circle()
                                        .fill(metric.tint.opacity(0.14))
                                        .frame(width: 44, height: 44)
                                    Image(systemName: metric.symbol)
                                        .foregroundStyle(metric.tint)
                                }

                                Text(metric.title)
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)

                                Text(metric.value)
                                    .font(.title3.weight(.bold))
                                    .minimumScaleFactor(0.7)

                                Text(metric.subtitle)
                                    .font(.footnote)
                                    .foregroundStyle(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                }

                PortalCard {
                    VStack(alignment: .leading, spacing: 16) {
                        HStack(alignment: .top) {
                            VStack(alignment: .leading, spacing: 6) {
                                Text("Charging trend")
                                    .font(.title3.weight(.bold))
                                Text("Price and energy consumed across completed sessions in the last 12 months.")
                                    .foregroundStyle(.secondary)
                            }

                            Spacer()

                            Button {
                                Task {
                                    await refreshWalletBalance()
                                }
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
                                        colors: [.blue.opacity(0.28), .blue.opacity(0.02)],
                                        startPoint: .top,
                                        endPoint: .bottom
                                    )
                                )

                                LineMark(
                                    x: .value("Month", point.month),
                                    y: .value("Energy", point.energyKwh)
                                )
                                .foregroundStyle(.blue)
                                .lineStyle(.init(lineWidth: 3, lineCap: .round))

                                LineMark(
                                    x: .value("Month", point.month),
                                    y: .value("Price", point.priceUsd)
                                )
                                .foregroundStyle(.green)
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
                                .foregroundStyle(.blue)
                            Label("Price (USD)", systemImage: "dollarsign")
                                .foregroundStyle(.green)
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
        .background(Color(red: 0.96, green: 0.97, blue: 0.99))
        .navigationTitle("Driver Portal")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await refreshWalletBalance()
        }
    }

    @MainActor
    private func refreshWalletBalance() async {
        guard !refreshing else { return }
        refreshing = true
        defer { refreshing = false }

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
}
