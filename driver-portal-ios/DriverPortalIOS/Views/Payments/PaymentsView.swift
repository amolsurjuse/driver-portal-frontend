import SwiftUI

@MainActor
private final class PaymentsViewModel: ObservableObject {
    @Published private(set) var state: PaymentStateResponse?
    @Published var amountInput = "25"
    @Published var autoTopUpEnabled = false
    @Published var autoTopUpThreshold = "30"
    @Published var autoTopUpAmount = "20"
    @Published var autoTopUpCardID = ""
    @Published var newCardNickname = ""
    @Published var newCardBrand = "Visa"
    @Published var newCardNumber = ""
    @Published var newCardExpiry = ""
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let paymentService: PaymentService
    private var hasLoaded = false

    init(paymentService: PaymentService) {
        self.paymentService = paymentService
    }

    var walletBalance: Double {
        state?.wallet.balance ?? 0
    }

    var walletBudget: Double {
        state?.wallet.budget ?? 0
    }

    var currencyCode: String {
        state?.wallet.currency ?? "USD"
    }

    var currencySymbol: String {
        state?.wallet.currencySymbol ?? "$"
    }

    var quickAmounts: [Double] {
        let presets = state?.wallet.topUpPresets ?? [10, 25, 50, 100]
        return presets.isEmpty ? [10, 25, 50, 100] : presets
    }

    var cards: [PaymentCard] {
        state?.cards ?? []
    }

    var recentTopUps: [WalletTopUp] {
        Array((state?.topUps ?? []).prefix(5))
    }

    var walletUsagePercent: Double {
        guard walletBudget > 0 else { return 0 }
        return min(max((walletBalance / walletBudget) * 100, 0), 100)
    }

    var lastSyncedAt: String {
        PortalFormatters.syncTime(state?.lastSyncedAt ?? "")
    }

    func loadIfNeeded() async {
        guard !hasLoaded else { return }
        await load()
    }

    func load() async {
        guard !isLoading else { return }
        isLoading = true
        defer {
            isLoading = false
            hasLoaded = true
        }

        do {
            let response = try await paymentService.getState()
            apply(response)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func reload() async {
        guard !isLoading else { return }
        isLoading = true
        defer { isLoading = false }

        do {
            let response = try await paymentService.reload()
            apply(response.state)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func silentReload() async {
        guard !isLoading else { return }
        do {
            let response = try await paymentService.reload()
            apply(response.state)
        } catch {
            return
        }
    }

    func autoReloadLoop() async {
        while !Task.isCancelled {
            try? await Task.sleep(for: .seconds(30))
            guard !Task.isCancelled else { return }
            await silentReload()
        }
    }

    func selectQuickAmount(_ amount: Double) {
        amountInput = String(Int(amount))
    }

    func addBalance() async {
        guard !cards.isEmpty else {
            errorMessage = "Add a credit card before adding wallet balance."
            return
        }

        guard let amount = Double(amountInput), amount > 0 else {
            errorMessage = "Enter a valid top-up amount."
            return
        }

        isLoading = true
        defer { isLoading = false }

        do {
            _ = try await paymentService.addTopUp(
                AddTopUpRequest(amount: amount, source: .manual, note: nil)
            )
            let updated = try await paymentService.getState()
            apply(updated)
            amountInput = String(Int(quickAmounts.first ?? 25))
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func addCard() async {
        let digits = newCardNumber.filter { $0.isNumber }
        guard digits.count == 16 else {
            errorMessage = "Card number must contain 16 digits."
            return
        }

        guard newCardExpiry.range(of: #"^(0[1-9]|1[0-2])\/\d{2}$"#, options: .regularExpression) != nil else {
            errorMessage = "Use MM/YY format for expiry."
            return
        }

        let nickname = newCardNickname.trimmingCharacters(in: .whitespacesAndNewlines)
        guard nickname.count >= 2 else {
            errorMessage = "Nickname must be at least 2 characters."
            return
        }

        isLoading = true
        defer { isLoading = false }

        do {
            _ = try await paymentService.addCard(
                AddCardRequest(
                    brand: newCardBrand,
                    nickname: nickname,
                    cardNumber: digits,
                    expiry: newCardExpiry
                )
            )
            let updated = try await paymentService.getState()
            apply(updated)
            newCardNickname = ""
            newCardBrand = "Visa"
            newCardNumber = ""
            newCardExpiry = ""
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func deleteCard(_ card: PaymentCard) async {
        isLoading = true
        defer { isLoading = false }

        do {
            _ = try await paymentService.deleteCard(cardId: card.id)
            let updated = try await paymentService.getState()
            apply(updated)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func saveAutoTopUp() async {
        guard !cards.isEmpty else {
            errorMessage = "Add a credit card before configuring auto top-up."
            return
        }

        guard let threshold = Double(autoTopUpThreshold), threshold > 0 else {
            errorMessage = "Enter a valid threshold."
            return
        }

        guard let amount = Double(autoTopUpAmount), amount > 0 else {
            errorMessage = "Enter a valid auto top-up amount."
            return
        }

        guard !autoTopUpCardID.isEmpty else {
            errorMessage = "Choose a funding card."
            return
        }

        isLoading = true
        defer { isLoading = false }

        do {
            _ = try await paymentService.updateAutoTopUp(
                UpdateAutoTopUpRequest(
                    enabled: autoTopUpEnabled,
                    threshold: threshold,
                    amount: amount,
                    cardId: autoTopUpCardID
                )
            )
            let updated = try await paymentService.getState()
            apply(updated)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    private func apply(_ state: PaymentStateResponse) {
        self.state = state
        self.errorMessage = nil
        autoTopUpEnabled = state.autoTopUp.enabled && !state.cards.isEmpty
        autoTopUpThreshold = String(Int(state.autoTopUp.threshold))
        autoTopUpAmount = String(Int(state.autoTopUp.amount))
        autoTopUpCardID = resolvedCardID(for: state)
        if amountInput.isEmpty {
            amountInput = String(Int(state.wallet.topUpPresets.first ?? 25))
        }
    }

    private func resolvedCardID(for state: PaymentStateResponse) -> String {
        if state.cards.contains(where: { $0.id == state.autoTopUp.cardId }) {
            return state.autoTopUp.cardId
        }
        return state.cards.first?.id ?? ""
    }
}

struct PaymentsView: View {
    @StateObject private var model: PaymentsViewModel
    @State private var pendingDeleteCard: PaymentCard?

    init(paymentService: PaymentService) {
        _model = StateObject(wrappedValue: PaymentsViewModel(paymentService: paymentService))
    }

    var body: some View {
        ZStack {
            SpaceBackground()

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Payments")
                            .font(.system(size: 34, weight: .bold, design: .rounded))
                            .foregroundStyle(ChargingTheme.brightText)
                        Text("Manage wallet balance, funding cards, and automatic reloads.")
                            .foregroundStyle(ChargingTheme.dimText)
                        Text("Last synced at \(model.lastSyncedAt)")
                            .font(.footnote)
                            .foregroundStyle(ChargingTheme.dimText)
                    }

                    if let errorMessage = model.errorMessage {
                        Text(errorMessage)
                            .font(.footnote.weight(.semibold))
                            .padding()
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                            .foregroundStyle(.red)
                    }

                    PortalCard {
                        VStack(alignment: .leading, spacing: 16) {
                            HStack(alignment: .center) {
                                VStack(alignment: .leading, spacing: 6) {
                                    Text("Wallet balance")
                                        .font(.headline)
                                        .foregroundStyle(ChargingTheme.dimText)
                                    Text(PortalFormatters.currency(model.walletBalance, code: model.currencyCode, fallbackSymbol: model.currencySymbol))
                                        .font(.system(size: 32, weight: .bold, design: .rounded))
                                        .foregroundStyle(ChargingTheme.neonCyan)
                                    Text("Available for charging sessions")
                                        .foregroundStyle(ChargingTheme.dimText)
                                }

                                Spacer()

                                ZStack {
                                    RoundedRectangle(cornerRadius: 22, style: .continuous)
                                        .fill(ChargingTheme.neonBlue.opacity(0.12))
                                        .frame(width: 72, height: 72)
                                    Image(systemName: "wallet.pass.fill")
                                        .font(.system(size: 28))
                                        .foregroundStyle(ChargingTheme.neonBlue)
                                }
                            }

                            VStack(alignment: .leading, spacing: 8) {
                                HStack {
                                    Text("Budget coverage")
                                        .foregroundStyle(ChargingTheme.dimText)
                                    Spacer()
                                    Text("\(Int(model.walletUsagePercent))%")
                                        .fontWeight(.semibold)
                                        .foregroundStyle(ChargingTheme.neonCyan)
                                }
                                ProgressView(value: model.walletUsagePercent, total: 100)
                                    .tint(ChargingTheme.neonCyan)
                                Text("Against monthly target of \(PortalFormatters.currency(model.walletBudget, code: model.currencyCode, fallbackSymbol: model.currencySymbol))")
                                    .font(.footnote)
                                    .foregroundStyle(ChargingTheme.dimText)
                            }

                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 12) {
                                    ForEach(model.quickAmounts, id: \.self) { amount in
                                        Button("+\(Int(amount))") {
                                            model.selectQuickAmount(amount)
                                        }
                                        .buttonStyle(.bordered)
                                    }
                                }
                            }

                            HStack(spacing: 12) {
                                TextField("Amount", text: $model.amountInput)
                                    .keyboardType(.decimalPad)
                                    .padding()
                                    .background(Color.white.opacity(0.5))
                                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

                                Button("Add balance") {
                                    Haptics.impact(.medium)
                                    Task { await model.addBalance() }
                                }
                                .buttonStyle(.borderedProminent)
                                .tint(ChargingTheme.neonCyan)
                                .disabled(model.isLoading)
                            }

                            if model.cards.isEmpty {
                                Text("Add a credit card to enable wallet top-ups and auto top-up.")
                                    .font(.footnote)
                                    .foregroundStyle(ChargingTheme.dimText)
                            }
                        }
                    }

                    PortalCard {
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Auto top-up")
                                .font(.title3.weight(.bold))
                                .foregroundStyle(ChargingTheme.brightText)

                            Toggle("Enable auto top-up", isOn: $model.autoTopUpEnabled)
                                .tint(ChargingTheme.neonCyan)
                                .disabled(model.cards.isEmpty)

                            HStack {
                                TextField("Threshold", text: $model.autoTopUpThreshold)
                                    .keyboardType(.numberPad)
                                TextField("Amount", text: $model.autoTopUpAmount)
                                    .keyboardType(.numberPad)
                            }
                            .padding()
                            .background(Color.white.opacity(0.5))
                            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

                            Picker("Funding card", selection: $model.autoTopUpCardID) {
                                if model.cards.isEmpty {
                                    Text("No cards available").tag("")
                                }
                                ForEach(model.cards) { card in
                                    Text("\(card.brand) \u{2022}\u{2022}\u{2022}\u{2022} \(card.last4)").tag(card.id)
                                }
                            }
                            .pickerStyle(.menu)

                            Button("Save auto top-up") {
                                Task { await model.saveAutoTopUp() }
                            }
                            .buttonStyle(.borderedProminent)
                            .tint(ChargingTheme.neonCyan)
                            .disabled(model.isLoading || model.cards.isEmpty)
                        }
                    }

                    PortalCard {
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Recent top-ups")
                                .font(.title3.weight(.bold))
                                .foregroundStyle(ChargingTheme.brightText)

                            if model.recentTopUps.isEmpty {
                                Text("No top-up history yet.")
                                    .foregroundStyle(ChargingTheme.dimText)
                            } else {
                                ForEach(model.recentTopUps) { topUp in
                                    HStack {
                                        VStack(alignment: .leading, spacing: 6) {
                                            Text("+\(PortalFormatters.currency(topUp.amount, code: model.currencyCode, fallbackSymbol: model.currencySymbol))")
                                                .fontWeight(.semibold)
                                                .foregroundStyle(ChargingTheme.neonGreen)
                                            PortalBadge(
                                                title: topUp.source == .auto ? "Auto" : "Manual",
                                                tint: topUp.source == .auto ? .green : ChargingTheme.neonCyan
                                            )
                                            if let note = topUp.note, !note.isEmpty {
                                                Text(note)
                                                    .font(.footnote)
                                                    .foregroundStyle(ChargingTheme.dimText)
                                            }
                                        }
                                        Spacer()
                                        Text(PortalFormatters.topUpTime(topUp.timestamp))
                                            .font(.footnote)
                                            .foregroundStyle(ChargingTheme.dimText)
                                    }
                                    if topUp.id != model.recentTopUps.last?.id {
                                        Divider().overlay(ChargingTheme.dimText.opacity(0.15))
                                    }
                                }
                            }
                        }
                    }

                    PortalCard {
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Credit cards")
                                .font(.title3.weight(.bold))
                                .foregroundStyle(ChargingTheme.brightText)

                            TextField("Nickname", text: $model.newCardNickname)
                                .padding()
                                .background(Color.white.opacity(0.5))
                                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

                            Picker("Brand", selection: $model.newCardBrand) {
                                Text("Visa").tag("Visa")
                                Text("Mastercard").tag("Mastercard")
                                Text("Amex").tag("Amex")
                            }
                            .pickerStyle(.segmented)

                            HStack {
                                TextField("Card number", text: $model.newCardNumber)
                                    .keyboardType(.numberPad)
                                TextField("MM/YY", text: $model.newCardExpiry)
                                    .keyboardType(.numbersAndPunctuation)
                            }
                            .padding()
                            .background(Color.white.opacity(0.5))
                            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

                            Button("Add card") {
                                Haptics.impact(.medium)
                                Task { await model.addCard() }
                            }
                            .buttonStyle(.borderedProminent)
                            .tint(ChargingTheme.neonCyan)
                            .disabled(model.isLoading)

                            if model.cards.isEmpty {
                                Text("No cards added yet.")
                                    .foregroundStyle(ChargingTheme.dimText)
                            } else {
                                ForEach(model.cards) { card in
                                    HStack {
                                        VStack(alignment: .leading, spacing: 4) {
                                            Text(card.nickname)
                                                .fontWeight(.semibold)
                                                .foregroundStyle(ChargingTheme.brightText)
                                            Text("\(card.brand) \u{2022}\u{2022}\u{2022}\u{2022} \(card.last4) \u{00B7} Expires \(card.expiry)")
                                                .foregroundStyle(ChargingTheme.dimText)
                                        }
                                        Spacer()
                                        Button(role: .destructive) {
                                            pendingDeleteCard = card
                                        } label: {
                                            Image(systemName: "trash")
                                        }
                                    }
                                    if card.id != model.cards.last?.id {
                                        Divider().overlay(ChargingTheme.dimText.opacity(0.15))
                                    }
                                }
                            }
                        }
                    }
                }
                .padding(20)
            }
        }
        .navigationTitle("Payments")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    Task { await model.reload() }
                } label: {
                    Image(systemName: "arrow.clockwise")
                }
                .disabled(model.isLoading)
            }
        }
        .refreshable {
            Haptics.impact(.light)
            await model.load()
            Haptics.success()
        }
        .task {
            await model.loadIfNeeded()
        }
        .task {
            await model.autoReloadLoop()
        }
        .alert("Delete card", isPresented: Binding(get: {
            pendingDeleteCard != nil
        }, set: { isPresented in
            if !isPresented {
                pendingDeleteCard = nil
            }
        })) {
            Button("Cancel", role: .cancel) {
                pendingDeleteCard = nil
            }
            Button("Delete", role: .destructive) {
                guard let card = pendingDeleteCard else { return }
                Haptics.warning()
                Task {
                    await model.deleteCard(card)
                    pendingDeleteCard = nil
                }
            }
        } message: {
            if let pendingDeleteCard {
                Text("Are you sure you want to delete \(pendingDeleteCard.brand) \u{2022}\u{2022}\u{2022}\u{2022} \(pendingDeleteCard.last4)?")
            }
        }
    }
}
