import SwiftUI

struct MainTabView: View {
    let services: AppServices

    @EnvironmentObject private var sessionStore: SessionStore
    @State private var selectedTab = 0
    @State private var showAuthSheet = false
    @State private var showLogoutConfirmation = false

    var body: some View {
        TabView(selection: $selectedTab) {
            // Map tab — always visible, no auth required
            NavigationStack {
                StationMapView(
                    stationService: services.stationService,
                    chargerGraphQLService: services.chargerGraphQLService,
                    chargingSessionService: services.chargingSessionService
                )
                    .toolbar {
                        ToolbarItem(placement: .topBarTrailing) {
                            if sessionStore.isAuthenticated {
                                Menu {
                                    if let email = sessionStore.email {
                                        Text(email)
                                    }
                                    Divider()
                                    Button(role: .destructive) {
                                        showLogoutConfirmation = true
                                    } label: {
                                        Label("Log Out", systemImage: "rectangle.portrait.and.arrow.right")
                                    }
                                } label: {
                                    Image(systemName: "person.crop.circle.fill")
                                        .foregroundStyle(Color(red: 0.10, green: 0.38, blue: 0.73))
                                }
                            } else {
                                Button {
                                    showAuthSheet = true
                                } label: {
                                    Label("Sign In", systemImage: "person.crop.circle")
                                }
                            }
                        }
                    }
            }
            .tabItem {
                Label("Map", systemImage: "map.fill")
            }
            .tag(0)

            if sessionStore.isAuthenticated {
                NavigationStack {
                    DashboardView(
                        paymentService: services.paymentService,
                        chargingSessionService: services.chargingSessionService
                    )
                }
                .tabItem {
                    Label("Dashboard", systemImage: "chart.line.uptrend.xyaxis")
                }
                .tag(1)

                NavigationStack {
                    LiveChargingView(chargingSessionService: services.chargingSessionService)
                }
                .tabItem {
                    Label("Charging", systemImage: "ev.plug.dc.ccs2")
                }
                .tag(2)

                NavigationStack {
                    PaymentsView(paymentService: services.paymentService)
                }
                .tabItem {
                    Label("Payments", systemImage: "creditcard.and.123")
                }
                .tag(3)

                NavigationStack {
                    ChargingHistoryView(services: services)
                }
                .tabItem {
                    Label("History", systemImage: "clock.arrow.circlepath")
                }
                .tag(4)

                NavigationStack {
                    ProfileView(userService: services.userService)
                }
                .tabItem {
                    Label("Profile", systemImage: "person.crop.circle")
                }
                .tag(5)
            }
        }
        .tint(Color(red: 0.10, green: 0.38, blue: 0.73))
        .sheet(isPresented: $showAuthSheet) {
            AuthFlowView(services: services)
                .environmentObject(sessionStore)
        }
        .onChange(of: sessionStore.isAuthenticated) { _, isAuthenticated in
            if isAuthenticated {
                showAuthSheet = false
            } else {
                selectedTab = 0
            }
        }
        .alert("Log Out?", isPresented: $showLogoutConfirmation) {
            Button("Cancel", role: .cancel) {}
            Button("Log Out", role: .destructive) {
                Task { await sessionStore.logoutDevice() }
            }
        } message: {
            Text("You will be signed out of this device.")
        }
    }
}
