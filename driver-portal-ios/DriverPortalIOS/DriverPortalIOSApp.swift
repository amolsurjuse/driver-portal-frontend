import SwiftUI

@main
struct DriverPortalIOSApp: App {
    private let services: AppServices

    @StateObject private var sessionStore: SessionStore

    init() {
        let tokenVault = SessionTokenVault()
        let services = AppServices(tokenVault: tokenVault)
        self.services = services
        _sessionStore = StateObject(
            wrappedValue: SessionStore(
                authService: services.authService,
                tokenVault: tokenVault
            )
        )
    }

    var body: some Scene {
        WindowGroup {
            RootView(services: services)
                .environmentObject(sessionStore)
        }
    }
}
