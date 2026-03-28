import SwiftUI

struct MainTabView: View {
    let services: AppServices

    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                DashboardView(
                    paymentService: services.paymentService,
                    chargingSessionService: services.chargingSessionService
                )
            }
            .tabItem {
                Label("Dashboard", systemImage: "chart.line.uptrend.xyaxis")
            }
            .tag(0)

            NavigationStack {
                StationMapView(stationService: services.stationService)
            }
            .tabItem {
                Label("Map", systemImage: "map.fill")
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
        .tint(Color(red: 0.10, green: 0.38, blue: 0.73))
    }
}
