import Combine
import Foundation

@MainActor
final class SessionStore: ObservableObject {
    @Published private(set) var accessToken: String?
    @Published private(set) var userId: String?
    @Published private(set) var email: String?
    @Published private(set) var roles: [String] = []
    @Published private(set) var didAttemptBootstrap = false
    @Published var isBusy = false
    @Published var authError: String?

    var isAuthenticated: Bool {
        accessToken != nil
    }

    private let authService: AuthService
    private let tokenVault: SessionTokenVault
    private let userDefaults: UserDefaults
    private let storageKey = "driver_portal_ios.access_token"

    init(
        authService: AuthService,
        tokenVault: SessionTokenVault,
        userDefaults: UserDefaults = .standard
    ) {
        self.authService = authService
        self.tokenVault = tokenVault
        self.userDefaults = userDefaults
        restoreStoredToken()
    }

    func bootstrap() async {
        defer { didAttemptBootstrap = true }
        guard accessToken != nil else { return }

        if JWTDecoder.isExpired(accessToken, leeway: 60) {
            do {
                let response = try await authService.refresh()
                apply(accessToken: response.accessToken)
            } catch {
                clearSession()
            }
        }
    }

    func login(email: String, password: String) async -> Bool {
        isBusy = true
        authError = nil
        defer { isBusy = false }

        do {
            let response = try await authService.login(LoginRequest(email: email, password: password))
            apply(accessToken: response.accessToken)
            return true
        } catch {
            authError = error.localizedDescription
            return false
        }
    }

    func register(request: RegisterRequest) async -> Bool {
        isBusy = true
        authError = nil
        defer { isBusy = false }

        do {
            let response = try await authService.register(request)
            apply(accessToken: response.accessToken)
            return true
        } catch {
            authError = error.localizedDescription
            return false
        }
    }

    func logoutDevice() async {
        isBusy = true
        defer { isBusy = false }

        do {
            try await authService.logoutDevice()
        } catch {
            authError = error.localizedDescription
        }

        clearSession()
    }

    func logoutAll() async {
        isBusy = true
        defer { isBusy = false }

        do {
            try await authService.logoutAll()
        } catch {
            authError = error.localizedDescription
        }

        clearSession()
    }

    func clearSession() {
        accessToken = nil
        userId = nil
        email = nil
        roles = []
        tokenVault.accessToken = nil
        userDefaults.removeObject(forKey: storageKey)
    }

    private func restoreStoredToken() {
        guard let token = userDefaults.string(forKey: storageKey), !token.isEmpty else { return }
        apply(accessToken: token)
    }

    private func apply(accessToken: String) {
        let claims = JWTDecoder.decode(accessToken)
        self.accessToken = accessToken
        self.userId = claims?.uid
        self.email = claims?.sub
        self.roles = claims?.roles ?? []
        self.authError = nil
        self.tokenVault.accessToken = accessToken
        self.userDefaults.set(accessToken, forKey: storageKey)
    }
}
