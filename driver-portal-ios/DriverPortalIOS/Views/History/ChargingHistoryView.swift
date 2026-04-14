import SwiftUI

private struct ShareableFile: Identifiable {
    let id = UUID()
    let url: URL
}

struct ChargingHistoryView: View {
    let services: AppServices

    @State private var sessions: [ChargingSession] = []
    @State private var isLoading = false
    @State private var errorMessage: String?

    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Charging history")
                        .font(.system(size: 30, weight: .bold, design: .rounded))
                    Text("Recent charging sessions linked to your account.")
                        .foregroundStyle(.secondary)
                }
                .padding(.vertical, 8)
                .listRowBackground(Color.clear)
            }

            ForEach(sessions) { session in
                if session.isCompleted {
                    NavigationLink {
                        ReceiptDetailView(
                            session: session,
                            receiptPDFService: services.receiptPDFService,
                            chargingSessionService: services.chargingSessionService
                        )
                    } label: {
                        ChargingSessionRow(session: session)
                    }
                } else {
                    ChargingSessionRow(session: session)
                }
            }

            if isLoading {
                HStack {
                    Spacer()
                    ProgressView("Loading history…")
                    Spacer()
                }
            }

            if let errorMessage {
                Text(errorMessage)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle("History")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await loadHistory()
        }
    }

    private func loadHistory() async {
        guard !isLoading else { return }
        isLoading = true
        defer { isLoading = false }

        do {
            sessions = try await services.chargingSessionService.getSessionHistory(page: 0, size: 50)
            errorMessage = nil
        } catch {
            if sessions.isEmpty {
                sessions = ChargingSession.samples
            }
            errorMessage = "Unable to load history right now. Showing cached sample data."
        }
    }
}

private struct ChargingSessionRow: View {
    let session: ChargingSession

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(session.sessionId)
                    .font(.headline)
                Spacer()
                PortalBadge(
                    title: session.status.rawValue,
                    tint: session.isCompleted ? .green : .orange
                )
            }

            Text(session.station)
                .font(.subheadline.weight(.semibold))

            HStack {
                Label(session.startedAt, systemImage: "play.fill")
                Spacer()
                Label(session.endedAt, systemImage: "stop.fill")
            }
            .font(.footnote)
            .foregroundStyle(.secondary)

            HStack {
                Text("\(String(format: "%.1f", session.energyKwh)) kWh")
                Spacer()
                Text("$\(String(format: "%.2f", session.costUsd))")
                    .fontWeight(.semibold)
            }
            .font(.subheadline)
        }
        .padding(.vertical, 6)
    }
}

private struct ReceiptDetailView: View {
    let session: ChargingSession
    let receiptPDFService: ReceiptPDFService
    let chargingSessionService: ChargingSessionService

    @State private var shareableFile: ShareableFile?
    @State private var exportError: String?
    @State private var resolvedSession: ChargingSession?

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Charging Receipt")
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                    Text("Session \(displaySession.sessionId)")
                        .foregroundStyle(.secondary)
                }

                PortalCard {
                    VStack(alignment: .leading, spacing: 14) {
                        receiptRow("Station", displaySession.station)
                        receiptRow("Connector", displaySession.connector)
                        receiptRow("Started", displaySession.startedAt)
                        receiptRow("Ended", displaySession.endedAt)
                        receiptRow("Energy consumed", "\(String(format: "%.1f", displaySession.energyKwh)) kWh")
                        receiptRow("Tariff", "$\(String(format: "%.2f", displaySession.tariffPerKwh)) / kWh")
                        receiptRow("Taxes", "$\(String(format: "%.2f", displaySession.taxesUsd))")
                        receiptRow("Total paid", "$\(String(format: "%.2f", displaySession.costUsd))", isTotal: true)
                        receiptRow("Payment method", displaySession.paymentMethod)
                    }
                }

                if let exportError {
                    Text(exportError)
                        .font(.footnote)
                        .foregroundStyle(.red)
                }

                Button {
                    do {
                        let exported = try receiptPDFService.export(session: displaySession)
                        shareableFile = ShareableFile(url: exported)
                        exportError = nil
                    } catch {
                        exportError = error.localizedDescription
                    }
                } label: {
                    Label("Export PDF", systemImage: "square.and.arrow.up")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
            }
            .padding(20)
        }
        .background(Color(red: 0.96, green: 0.97, blue: 0.99))
        .navigationTitle("Receipt")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await loadReceipt()
        }
        .sheet(item: $shareableFile) { file in
            ShareSheet(items: [file.url])
        }
    }

    private var displaySession: ChargingSession {
        resolvedSession ?? session
    }

    private func loadReceipt() async {
        do {
            resolvedSession = try await chargingSessionService.getReceipt(sessionId: session.sessionId)
        } catch {
            resolvedSession = nil
        }
    }

    @ViewBuilder
    private func receiptRow(_ label: String, _ value: String, isTotal: Bool = false) -> some View {
        HStack(alignment: .top) {
            Text(label)
                .foregroundStyle(.secondary)
            Spacer()
            Text(value)
                .fontWeight(isTotal ? .bold : .semibold)
        }
        if label != "Payment method" {
            Divider()
        }
    }
}
