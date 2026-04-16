import SwiftUI

// MARK: - Notifications View

struct NotificationsView: View {
    @State private var notifications = DriverNotification.samples
    @State private var filter: NotificationFilter = .all

    enum NotificationFilter: String, CaseIterable {
        case all = "All"
        case unread = "Unread"
        case charging = "Charging"
        case alerts = "Alerts"
    }

    var filteredNotifications: [DriverNotification] {
        switch filter {
        case .all:
            return notifications
        case .unread:
            return notifications.filter { !$0.isRead }
        case .charging:
            return notifications.filter { $0.type == .chargingComplete }
        case .alerts:
            return notifications.filter { $0.type == .lowBalance || $0.type == .system }
        }
    }

    var body: some View {
        ZStack {
            SpaceBackground()

            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    // Filter chips
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(NotificationFilter.allCases, id: \.self) { option in
                                Button {
                                    Haptics.selection()
                                    withAnimation(.spring(duration: 0.25)) {
                                        filter = option
                                    }
                                } label: {
                                    Text(option.rawValue)
                                        .font(.subheadline.weight(.semibold))
                                        .padding(.horizontal, 14)
                                        .padding(.vertical, 8)
                                        .background(
                                            filter == option
                                                ? AnyShapeStyle(
                                                    LinearGradient(
                                                        colors: [ChargingTheme.neonCyan, ChargingTheme.neonBlue],
                                                        startPoint: .leading,
                                                        endPoint: .trailing
                                                    )
                                                )
                                                : AnyShapeStyle(.ultraThinMaterial)
                                        )
                                        .foregroundStyle(filter == option ? .white : ChargingTheme.brightText)
                                        .clipShape(Capsule())
                                        .overlay(
                                            Capsule()
                                                .stroke(
                                                    filter == option
                                                        ? Color.clear
                                                        : Color.white.opacity(0.5),
                                                    lineWidth: 1
                                                )
                                        )
                                }
                            }
                        }
                    }

                    if filteredNotifications.isEmpty {
                        VStack(spacing: 12) {
                            Image(systemName: "bell.slash")
                                .font(.system(size: 44))
                                .foregroundStyle(ChargingTheme.dimText)
                            Text("No notifications")
                                .font(.headline)
                                .foregroundStyle(ChargingTheme.brightText)
                            Text("You're all caught up.")
                                .font(.subheadline)
                                .foregroundStyle(ChargingTheme.dimText)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 60)
                    } else {
                        ForEach(filteredNotifications) { notification in
                            NotificationRow(notification: notification) {
                                markAsRead(notification)
                            }
                        }
                    }
                }
                .padding(20)
            }
        }
        .navigationTitle("Notifications")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Mark All Read") {
                    Haptics.success()
                    withAnimation {
                        markAllAsRead()
                    }
                }
                .font(.subheadline)
                .disabled(notifications.allSatisfy(\.isRead))
            }
        }
    }

    private func markAsRead(_ notification: DriverNotification) {
        guard let index = notifications.firstIndex(where: { $0.id == notification.id }) else { return }
        notifications[index] = DriverNotification(
            id: notification.id,
            title: notification.title,
            body: notification.body,
            timestamp: notification.timestamp,
            type: notification.type,
            isRead: true
        )
    }

    private func markAllAsRead() {
        notifications = notifications.map {
            DriverNotification(id: $0.id, title: $0.title, body: $0.body, timestamp: $0.timestamp, type: $0.type, isRead: true)
        }
    }
}

// MARK: - Notification Row

private struct NotificationRow: View {
    let notification: DriverNotification
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(alignment: .top, spacing: 14) {
                ZStack {
                    Circle()
                        .fill(iconColor.opacity(0.12))
                        .frame(width: 42, height: 42)
                    Image(systemName: iconName)
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundStyle(iconColor)
                }

                VStack(alignment: .leading, spacing: 4) {
                    HStack {
                        Text(notification.title)
                            .font(.subheadline.weight(notification.isRead ? .regular : .bold))
                            .foregroundStyle(ChargingTheme.brightText)

                        Spacer()

                        if !notification.isRead {
                            Circle()
                                .fill(ChargingTheme.neonCyan)
                                .frame(width: 8, height: 8)
                        }
                    }

                    Text(notification.body)
                        .font(.caption)
                        .foregroundStyle(ChargingTheme.dimText)
                        .lineLimit(2)

                    Text(notification.timestamp)
                        .font(.caption2)
                        .foregroundStyle(ChargingTheme.dimText.opacity(0.6))
                }
            }
            .padding(14)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(notification.isRead ? .ultraThinMaterial : .regularMaterial)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .stroke(
                                notification.isRead
                                    ? Color.white.opacity(0.4)
                                    : ChargingTheme.neonCyan.opacity(0.2),
                                lineWidth: 1
                            )
                    )
                    .shadow(color: ChargingTheme.glassShadow, radius: 12, y: 4)
            )
        }
        .buttonStyle(.plain)
    }

    private var iconName: String {
        switch notification.type {
        case .chargingComplete: return "checkmark.circle.fill"
        case .lowBalance: return "exclamationmark.triangle.fill"
        case .stationAvailable: return "ev.plug.dc.ccs2"
        case .promo: return "tag.fill"
        case .system: return "gear"
        }
    }

    private var iconColor: Color {
        switch notification.type {
        case .chargingComplete: return ChargingTheme.neonGreen
        case .lowBalance: return .orange
        case .stationAvailable: return ChargingTheme.neonCyan
        case .promo: return ChargingTheme.meshPurple
        case .system: return ChargingTheme.dimText
        }
    }
}
