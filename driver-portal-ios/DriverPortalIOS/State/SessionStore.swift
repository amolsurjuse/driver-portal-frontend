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
    private let secureVault: SecureTokenVault
    private let userDefaults: UserDefaults
    private let legacyStorageKey = "driver_portal_ios.access_token"

    init(
        authService: AuthService,
        tokenVault: SessionTokenVault,
        secureVault: SecureTokenVault = SecureTokenVault(),
        userDefaults: UserDefaults = .standard
    ) {
        self.authService = authService
        self.tokenVault = tokenVault
        self.secureVault = secureVault
        self.userDefaults = userDefaults
        migrateAndRestore()
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
        secureVault.accessToken = nil
        secureVault.refreshToken = nil
        userDefaults.removeObject(forKey: legacyStorageKey)
    }

    // MARK: - Private

    /// Migrate tokens from UserDefaults to Keychain on first launch after update,
    /// then always restore from Keychain.
    private func migrateAndRestore() {
        // Check if there's a legacy token in UserDefaults that needs migration
        if let legacyToken = userDefaults.string(forKey: legacyStorageKey), !legacyToken.isEmpty {
            secureVault.accessToken = legacyToken
            userDefaults.removeObject(forKey: legacyStorageKey)
        }

        // Restore from Keychain
        if let token = secureVault.accessToken, !token.isEmpty {
            apply(accessToken: token)
        }
    }

    private func apply(accessToken: String) {
        let claims = JWTDecoder.decode(accessToken)
        self.accessToken = accessToken
        self.userId = claims?.uid
        self.email = claims?.sub
        self.roles = claims?.roles ?? []
        self.authError = nil
        self.tokenVault.accessToken = accessToken
        self.secureVault.accessToken = accessToken
    }
}
