import SwiftUI

struct MainTabView: View {
    let services: AppServices

    var body: some View {
        TabView {
            NavigationStack {
                DashboardView(paymentService: services.paymentService)
            }
            .tabItem {
                Label("Dashboard", systemImage: "chart.line.uptrend.xyaxis")
            }

            NavigationStack {
                PaymentsView(paymentService: services.paymentService)
            }
            .tabItem {
                Label("Payments", systemImage: "creditcard.and.123")
            }

            NavigationStack {
                ChargingHistoryView(services: services)
            }
            .tabItem {
                Label("History", systemImage: "clock.arrow.circlepath")
            }

            NavigationStack {
                ProfileView(userService: services.userService)
            }
            .tabItem {
                Label("Profile", systemImage: "person.crop.circle")
            }
        }
        .tint(Color(red: 0.10, green: 0.38, blue: 0.73))
    }
}
