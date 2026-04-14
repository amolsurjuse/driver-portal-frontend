import SwiftUI

struct RootView: View {
    @EnvironmentObject private var sessionStore: SessionStore

    let services: AppServices

    var body: some View {
        Group {
            if !sessionStore.didAttemptBootstrap {
                ZStack {
                    LinearGradient(
                        colors: [Color(red: 0.95, green: 0.97, blue: 1.0), Color.white],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                    .ignoresSafeArea()

                    VStack(spacing: 16) {
                        ProgressView()
                            .progressViewStyle(.circular)
                            .tint(.blue)
                        Text("Preparing your driver portal")
                            .font(.headline)
                    }
                }
            } else if sessionStore.isAuthenticated {
                MainTabView(services: services)
            } else {
                AuthFlowView(services: services)
            }
        }
        .task {
            async let countriesPrefetch: Void = services.authService.prefetchCountries()
            if !sessionStore.didAttemptBootstrap {
                await sessionStore.bootstrap()
            }
            await countriesPrefetch
        }
    }
}
