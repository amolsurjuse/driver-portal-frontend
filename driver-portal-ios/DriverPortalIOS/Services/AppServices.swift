import Foundation
import UIKit

struct AppConfiguration {
    let authBaseURL: URL
    let paymentBaseURL: URL
    let userBaseURL: URL
    let stationBaseURL: URL
    let chargerBaseURL: URL
    let sessionBaseURL: URL

    static let electraHub = AppConfiguration(
        authBaseURL: URL(string: "https://dev.electrahub.com:8443/auth")!,
        paymentBaseURL: URL(string: "https://dev.electrahub.com:8443/payment")!,
        userBaseURL: URL(string: "https://dev.electrahub.com:8443/user")!,
        stationBaseURL: URL(string: "https://dev.electrahub.com:8443/station")!,
        chargerBaseURL: URL(string: "https://dev.electrahub.com:8443/charger")!,
        sessionBaseURL: URL(string: "https://dev.electrahub.com:8443/session")!
    )
}

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}

struct APIError: LocalizedError {
    let statusCode: Int
    let message: String

    var errorDescription: String? {
        message
    }
}

private struct APIErrorEnvelope: Decodable {
    let message: String?
    let details: [String]?
}

/// Accepts the dev server's self-signed certificate so URLSession doesn't reject it.
private final class DevSSLDelegate: NSObject, URLSessionDelegate, URLSessionTaskDelegate {
    // Session-level challenge (covers legacy / callback-based paths)
    func urlSession(
        _ session: URLSession,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        handleChallenge(challenge, completionHandler: completionHandler)
    }

    // Task-level challenge (used by async data(for:) API)
    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        handleChallenge(challenge, completionHandler: completionHandler)
    }

    private func handleChallenge(
        _ challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        guard challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
              let serverTrust = challenge.protectionSpace.serverTrust else {
            completionHandler(.performDefaultHandling, nil)
            return
        }
        completionHandler(.useCredential, URLCredential(trust: serverTrust))
    }
}

final class APIClient {
    private let session: URLSession
    private let sslDelegate: DevSSLDelegate
    let tokenProvider: () -> String?

    /// Provides a closure the SSE client can use to get the current bearer token.
    func getTokenProvider() -> () -> String? {
        tokenProvider
    }

    init(tokenProvider: @escaping () -> String?) {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 30
        configuration.timeoutIntervalForResource = 60
        configuration.httpCookieStorage = HTTPCookieStorage.shared
        configuration.httpShouldSetCookies = true
        configuration.requestCachePolicy = .reloadIgnoringLocalAndRemoteCacheData
        let delegate = DevSSLDelegate()
        self.sslDelegate = delegate
        self.session = URLSession(configuration: configuration, delegate: delegate, delegateQueue: nil)
        self.tokenProvider = tokenProvider
    }

    func request<Response: Decodable>(_ request: URLRequest, as type: Response.Type = Response.self) async throws -> Response {
        let (data, response) = try await session.data(for: authorized(request), delegate: sslDelegate)
        return try decode(data: data, response: response, as: type)
    }

    func request(_ request: URLRequest) async throws {
        let (_, response) = try await session.data(for: authorized(request), delegate: sslDelegate)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError(statusCode: 0, message: "Unexpected server response.")
        }
        guard (200 ..< 300).contains(httpResponse.statusCode) else {
            throw APIError(statusCode: httpResponse.statusCode, message: "The request failed.")
        }
    }

    func makeRequest(
        baseURL: URL,
        path: String,
        method: HTTPMethod,
        query: [URLQueryItem] = []
    ) throws -> URLRequest {
        try buildRequest(baseURL: baseURL, path: path, method: method, query: query, body: nil as Data?)
    }

    func makeRequest<Body: Encodable>(
        baseURL: URL,
        path: String,
        method: HTTPMethod,
        query: [URLQueryItem] = [],
        body: Body
    ) throws -> URLRequest {
        let payload = try JSONEncoder().encode(body)
        return try buildRequest(baseURL: baseURL, path: path, method: method, query: query, body: payload)
    }

    private func buildRequest(
        baseURL: URL,
        path: String,
        method: HTTPMethod,
        query: [URLQueryItem],
        body: Data?
    ) throws -> URLRequest {
        let normalizedPath = path.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard var components = URLComponents(url: baseURL.appendingPathComponent(normalizedPath), resolvingAgainstBaseURL: false) else {
            throw APIError(statusCode: 0, message: "Unable to create request URL.")
        }
        if !query.isEmpty {
            components.queryItems = query
        }
        guard let url = components.url else {
            throw APIError(statusCode: 0, message: "Unable to create request URL.")
        }

        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let body {
            request.httpBody = body
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        }
        return request
    }

    private func authorized(_ request: URLRequest) -> URLRequest {
        guard let token = tokenProvider(), !token.isEmpty else { return request }
        var request = request
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        return request
    }

    private func decode<Response: Decodable>(data: Data, response: URLResponse, as type: Response.Type) throws -> Response {
        guard let httpResponse = response as? HTTPURLResponse else {
            throw APIError(statusCode: 0, message: "Unexpected server response.")
        }

        guard (200 ..< 300).contains(httpResponse.statusCode) else {
            let message = resolvedErrorMessage(from: data) ?? HTTPURLResponse.localizedString(forStatusCode: httpResponse.statusCode)
            throw APIError(statusCode: httpResponse.statusCode, message: message)
        }

        do {
            return try JSONDecoder().decode(type, from: data)
        } catch {
            throw APIError(statusCode: httpResponse.statusCode, message: "Unable to decode the server response.")
        }
    }

    private func resolvedErrorMessage(from data: Data) -> String? {
        if let envelope = try? JSONDecoder().decode(APIErrorEnvelope.self, from: data) {
            if let detail = envelope.details?.first, !detail.isEmpty {
                return detail
            }
            if let message = envelope.message, !message.isEmpty {
                return message
            }
        }

        if let text = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines), !text.isEmpty {
            return text
        }

        return nil
    }
}

final class AuthService {
    private let client: APIClient
    private let configuration: AppConfiguration

    /// In-memory cache of countries, loaded once at app launch.
    private(set) var cachedCountries: [CountryOption] = []

    init(client: APIClient, configuration: AppConfiguration) {
        self.client = client
        self.configuration = configuration
    }

    /// Fetches and caches the country list. Call once during app startup.
    func prefetchCountries() async {
        guard cachedCountries.isEmpty else { return }
        do {
            cachedCountries = try await listCountries().sorted { $0.name < $1.name }
        } catch {
            // Silently fail; RegisterView will retry if cache is still empty.
        }
    }

    func login(_ payload: LoginRequest) async throws -> AccessTokenResponse {
        let request = try client.makeRequest(
            baseURL: configuration.authBaseURL,
            path: "api/auth/login",
            method: .post,
            body: payload
        )
        return try await client.request(request)
    }

    func register(_ payload: RegisterRequest) async throws -> AccessTokenResponse {
        let request = try client.makeRequest(
            baseURL: configuration.authBaseURL,
            path: "api/auth/register",
            method: .post,
            body: payload
        )
        return try await client.request(request)
    }

    func refresh() async throws -> AccessTokenResponse {
        let request = try client.makeRequest(
            baseURL: configuration.authBaseURL,
            path: "api/auth/refresh",
            method: .post,
            body: EmptyBody()
        )
        return try await client.request(request)
    }

    func logoutDevice() async throws {
        let request = try client.makeRequest(
            baseURL: configuration.authBaseURL,
            path: "api/auth/logout-device",
            method: .post,
            body: EmptyBody()
        )
        try await client.request(request)
    }

    func logoutAll() async throws {
        let request = try client.makeRequest(
            baseURL: configuration.authBaseURL,
            path: "api/auth/logout-all",
            method: .post,
            body: EmptyBody()
        )
        try await client.request(request)
    }

    func listCountries() async throws -> [CountryOption] {
        let request = try client.makeRequest(
            baseURL: configuration.authBaseURL,
            path: "api/countries",
            method: .get
        )
        return try await client.request(request)
    }
}

final class PaymentService {
    private let client: APIClient
    private let configuration: AppConfiguration

    init(client: APIClient, configuration: AppConfiguration) {
        self.client = client
        self.configuration = configuration
    }

    func getState() async throws -> PaymentStateResponse {
        let request = try client.makeRequest(
            baseURL: configuration.paymentBaseURL,
            path: "api/v1/payment/state",
            method: .get
        )
        return try await client.request(request)
    }

    func addTopUp(_ payload: AddTopUpRequest) async throws -> TopUpCreatedResponse {
        let request = try client.makeRequest(
            baseURL: configuration.paymentBaseURL,
            path: "api/v1/payment/wallet/topups",
            method: .post,
            body: payload
        )
        return try await client.request(request)
    }

    func addCard(_ payload: AddCardRequest) async throws -> PaymentCard {
        let request = try client.makeRequest(
            baseURL: configuration.paymentBaseURL,
            path: "api/v1/payment/cards",
            method: .post,
            body: payload
        )
        return try await client.request(request)
    }

    func deleteCard(cardId: String) async throws -> DeleteCardResponse {
        let request = try client.makeRequest(
            baseURL: configuration.paymentBaseURL,
            path: "api/v1/payment/cards/\(cardId)",
            method: .delete
        )
        return try await client.request(request)
    }

    func updateAutoTopUp(_ payload: UpdateAutoTopUpRequest) async throws -> AutoTopUpConfig {
        let request = try client.makeRequest(
            baseURL: configuration.paymentBaseURL,
            path: "api/v1/payment/auto-topup",
            method: .put,
            body: payload
        )
        return try await client.request(request)
    }

    func reload() async throws -> ReloadResponse {
        let request = try client.makeRequest(
            baseURL: configuration.paymentBaseURL,
            path: "api/v1/payment/reload",
            method: .post,
            body: EmptyBody()
        )
        return try await client.request(request)
    }
}

final class UserService {
    private let client: APIClient
    private let configuration: AppConfiguration

    init(client: APIClient, configuration: AppConfiguration) {
        self.client = client
        self.configuration = configuration
    }

    func getProfile(userId: String) async throws -> UserProfileResponse {
        let request = try client.makeRequest(
            baseURL: configuration.userBaseURL,
            path: "api/v1/users/\(userId)/profile",
            method: .get
        )
        return try await client.request(request)
    }

    func updateProfile(userId: String, payload: UpdateUserProfileRequest) async throws -> UserProfileResponse {
        let request = try client.makeRequest(
            baseURL: configuration.userBaseURL,
            path: "api/v1/users/\(userId)/profile",
            method: .put,
            body: payload
        )
        return try await client.request(request)
    }

    func requestAccountDeletion(userId: String, confirmDirectDeletion: Bool) async throws -> AccountDeletionResponse {
        let request = try client.makeRequest(
            baseURL: configuration.userBaseURL,
            path: "api/v1/users/\(userId)/account-deletion",
            method: .post,
            body: AccountDeletionRequest(confirmDirectDeletion: confirmDirectDeletion)
        )
        return try await client.request(request)
    }

    func searchUsers(query: String, limit: Int = 25) async throws -> UserSearchResponse {
        let request = try client.makeRequest(
            baseURL: configuration.userBaseURL,
            path: "api/v1/users",
            method: .get,
            query: [
                URLQueryItem(name: "query", value: query),
                URLQueryItem(name: "limit", value: String(limit))
            ]
        )
        return try await client.request(request)
    }

    func resolveProfile(userId: String?, email: String?) async throws -> UserProfileResponse {
        if let userId, !userId.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            do {
                return try await getProfile(userId: userId)
            } catch let error as APIError where error.statusCode == 404 {
                _ = error
            }
        }

        let normalizedEmail = (email ?? "").trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !normalizedEmail.isEmpty else {
            throw APIError(statusCode: 0, message: "Missing user identity in session token.")
        }

        let response = try await searchUsers(query: normalizedEmail, limit: 50)
        guard let match = response.items.first(where: { $0.email.lowercased() == normalizedEmail }) else {
            throw APIError(statusCode: 404, message: "User not found.")
        }
        return try await getProfile(userId: match.userId)
    }
}

final class ReceiptPDFService {
    func export(session: ChargingSession) throws -> URL {
        let fileURL = FileManager.default.temporaryDirectory
            .appendingPathComponent("\(session.sessionId)-receipt")
            .appendingPathExtension("pdf")

        let bounds = CGRect(x: 0, y: 0, width: 612, height: 792)
        let renderer = UIGraphicsPDFRenderer(bounds: bounds)

        let data = renderer.pdfData { context in
            context.beginPage()

            let titleAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 28, weight: .bold),
                .foregroundColor: UIColor(red: 0.07, green: 0.12, blue: 0.19, alpha: 1)
            ]
            let bodyAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 14, weight: .regular),
                .foregroundColor: UIColor(red: 0.28, green: 0.34, blue: 0.40, alpha: 1)
            ]
            let strongAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 15, weight: .semibold),
                .foregroundColor: UIColor(red: 0.07, green: 0.12, blue: 0.19, alpha: 1)
            ]

            NSString(string: "Charging Receipt").draw(at: CGPoint(x: 48, y: 56), withAttributes: titleAttributes)
            NSString(string: "Electra Hub · \(session.sessionId)").draw(at: CGPoint(x: 48, y: 94), withAttributes: bodyAttributes)

            let rows: [(String, String)] = [
                ("Station", session.station),
                ("Connector", session.connector),
                ("Started", session.startedAt),
                ("Ended", session.endedAt),
                ("Energy consumed", "\(String(format: "%.1f", session.energyKwh)) kWh"),
                ("Tariff", "$\(String(format: "%.2f", session.tariffPerKwh)) / kWh"),
                ("Taxes", "$\(String(format: "%.2f", session.taxesUsd))"),
                ("Total paid", "$\(String(format: "%.2f", session.costUsd))"),
                ("Payment method", session.paymentMethod)
            ]

            var y: CGFloat = 150
            for (label, value) in rows {
                UIColor(red: 0.90, green: 0.93, blue: 0.96, alpha: 1).setStroke()
                context.cgContext.setLineWidth(1)
                context.cgContext.move(to: CGPoint(x: 48, y: y + 26))
                context.cgContext.addLine(to: CGPoint(x: bounds.width - 48, y: y + 26))
                context.cgContext.strokePath()

                NSString(string: label).draw(at: CGPoint(x: 48, y: y), withAttributes: bodyAttributes)
                let valueText = NSString(string: value)
                let size = valueText.size(withAttributes: strongAttributes)
                valueText.draw(
                    at: CGPoint(x: bounds.width - 48 - size.width, y: y),
                    withAttributes: strongAttributes
                )
                y += 42
            }
        }

        try data.write(to: fileURL, options: .atomic)
        return fileURL
    }
}

final class AppServices {
    let configuration: AppConfiguration
    let tokenVault: SessionTokenVault
    let apiClient: APIClient
    let authService: AuthService
    let paymentService: PaymentService
    let userService: UserService
    let stationService: StationService
    let chargerGraphQLService: ChargerGraphQLService
    let chargingSessionService: ChargingSessionService
    let receiptPDFService: ReceiptPDFService

    init(configuration: AppConfiguration = .electraHub, tokenVault: SessionTokenVault) {
        self.configuration = configuration
        self.tokenVault = tokenVault
        self.apiClient = APIClient(tokenProvider: { tokenVault.accessToken })
        self.authService = AuthService(client: apiClient, configuration: configuration)
        self.paymentService = PaymentService(client: apiClient, configuration: configuration)
        self.userService = UserService(client: apiClient, configuration: configuration)
        self.stationService = StationService(client: apiClient, configuration: configuration)
        self.chargerGraphQLService = ChargerGraphQLService(client: apiClient, configuration: configuration)
        self.chargingSessionService = ChargingSessionService(client: apiClient, configuration: configuration)
        self.receiptPDFService = ReceiptPDFService()
    }
}

private struct EmptyBody: Encodable {}
