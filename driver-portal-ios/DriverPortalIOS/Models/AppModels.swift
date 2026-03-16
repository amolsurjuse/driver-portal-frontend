import Foundation

struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct AddressDTO: Codable {
    let street: String
    let city: String
    let state: String
    let postalCode: String
    let countryIsoCode: String
}

struct CountryOption: Codable, Hashable, Identifiable {
    var id: String { code }

    let code: String
    let name: String
    let dialCode: String
}

struct RegisterRequest: Codable {
    let email: String
    let password: String
    let firstName: String
    let lastName: String
    let phoneNumber: String
    let address: AddressDTO
}

struct AccessTokenResponse: Codable {
    let accessToken: String
    let tokenType: String
}

enum TopUpSourceAPI: String, Codable {
    case manual = "MANUAL"
    case auto = "AUTO"
}

struct WalletStateResponse: Codable {
    let balance: Double
    let budget: Double
    let currency: String
    let currencySymbol: String
    let countryCode: String
    let topUpPresets: [Double]
}

struct AutoTopUpConfig: Codable {
    let enabled: Bool
    let threshold: Double
    let amount: Double
    let cardId: String
}

struct PaymentCard: Codable, Hashable, Identifiable {
    let id: String
    let brand: String
    let nickname: String
    let last4: String
    let expiry: String
}

struct WalletTopUp: Codable, Hashable, Identifiable {
    let id: String
    let amount: Double
    let timestamp: String
    let source: TopUpSourceAPI
    let note: String?
}

struct PaymentStateResponse: Codable {
    let wallet: WalletStateResponse
    let autoTopUp: AutoTopUpConfig
    let cards: [PaymentCard]
    let topUps: [WalletTopUp]
    let lastSyncedAt: String
}

struct AddTopUpRequest: Codable {
    let amount: Double
    let source: TopUpSourceAPI?
    let note: String?
}

struct TopUpCreatedResponse: Codable {
    let topUp: WalletTopUp
    let walletBalance: Double
}

struct AddCardRequest: Codable {
    let brand: String
    let nickname: String
    let cardNumber: String
    let expiry: String
}

struct DeleteCardResponse: Codable {
    let cardId: String
    let deleted: Bool
}

struct UpdateAutoTopUpRequest: Codable {
    let enabled: Bool
    let threshold: Double
    let amount: Double
    let cardId: String
}

struct ReloadResponse: Codable {
    let lastSyncedAt: String
    let autoTopUpApplied: Bool
    let state: PaymentStateResponse
}

struct UserSummaryResponse: Codable, Hashable, Identifiable {
    var id: String { userId }

    let userId: String
    let email: String
    let firstName: String?
    let lastName: String?
    let phoneNumber: String?
    let enabled: Bool
    let createdAt: String
}

struct UserSearchResponse: Codable {
    let items: [UserSummaryResponse]
    let total: Int
    let limit: Int
    let offset: Int
}

struct UserProfileResponse: Codable {
    let userId: String
    let email: String
    let firstName: String?
    let lastName: String?
    let phoneNumber: String?
    let street: String?
    let city: String?
    let state: String?
    let postalCode: String?
    let countryCode: String?
    let countryName: String?
    let countryDialCode: String?
    let enabled: Bool
    let createdAt: String
}

struct UpdateUserProfileRequest: Codable {
    let firstName: String
    let lastName: String
    let address: AddressDTO
}

enum ChargingStatus: String, Codable, Hashable {
    case completed = "Completed"
    case inProgress = "In Progress"
}

struct ChargingSession: Hashable, Identifiable {
    var id: String { sessionId }

    let sessionId: String
    let station: String
    let startedAt: String
    let endedAt: String
    let energyKwh: Double
    let costUsd: Double
    let status: ChargingStatus
    let connector: String
    let tariffPerKwh: Double
    let taxesUsd: Double
    let paymentMethod: String

    var isCompleted: Bool {
        status == .completed
    }

    static let samples: [ChargingSession] = [
        ChargingSession(
            sessionId: "sess-1001",
            station: "Electra Hub - SF Downtown",
            startedAt: "2026-02-21 07:40",
            endedAt: "2026-02-21 08:32",
            energyKwh: 21.4,
            costUsd: 9.12,
            status: .completed,
            connector: "CCS-1",
            tariffPerKwh: 0.36,
            taxesUsd: 1.42,
            paymentMethod: "Visa •••• 4242"
        ),
        ChargingSession(
            sessionId: "sess-1000",
            station: "Electra Hub - Palo Alto",
            startedAt: "2026-02-19 19:05",
            endedAt: "2026-02-19 19:44",
            energyKwh: 16.9,
            costUsd: 7.43,
            status: .completed,
            connector: "Type2-2",
            tariffPerKwh: 0.34,
            taxesUsd: 1.12,
            paymentMethod: "Mastercard •••• 1144"
        ),
        ChargingSession(
            sessionId: "sess-999",
            station: "Electra Hub - San Jose North",
            startedAt: "2026-02-18 09:12",
            endedAt: "-",
            energyKwh: 4.8,
            costUsd: 2.11,
            status: .inProgress,
            connector: "CCS-2",
            tariffPerKwh: 0.35,
            taxesUsd: 0.0,
            paymentMethod: "Visa •••• 4242"
        )
    ]
}

struct UsagePoint: Identifiable {
    let id = UUID()
    let month: String
    let energyKwh: Double
    let priceUsd: Double

    static let lastYear: [UsagePoint] = [
        UsagePoint(month: "Jan", energyKwh: 22, priceUsd: 10.8),
        UsagePoint(month: "Feb", energyKwh: 27, priceUsd: 12.6),
        UsagePoint(month: "Mar", energyKwh: 31, priceUsd: 14.2),
        UsagePoint(month: "Apr", energyKwh: 29, priceUsd: 13.7),
        UsagePoint(month: "May", energyKwh: 33, priceUsd: 15.1),
        UsagePoint(month: "Jun", energyKwh: 38, priceUsd: 17.5),
        UsagePoint(month: "Jul", energyKwh: 36, priceUsd: 16.8),
        UsagePoint(month: "Aug", energyKwh: 40, priceUsd: 18.4),
        UsagePoint(month: "Sep", energyKwh: 43, priceUsd: 20.1),
        UsagePoint(month: "Oct", energyKwh: 41, priceUsd: 19.4),
        UsagePoint(month: "Nov", energyKwh: 46, priceUsd: 21.3),
        UsagePoint(month: "Dec", energyKwh: 49, priceUsd: 22.7)
    ]
}
