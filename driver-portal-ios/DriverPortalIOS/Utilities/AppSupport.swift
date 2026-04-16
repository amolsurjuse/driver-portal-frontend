import Foundation
import SwiftUI
import UIKit

final class SessionTokenVault {
    var accessToken: String?
}

struct JWTClaims: Decodable {
    let sub: String?
    let uid: String?
    let roles: [String]?
    let exp: TimeInterval?
}

enum JWTDecoder {
    static func decode(_ token: String?) -> JWTClaims? {
        guard let token else { return nil }
        let parts = token.split(separator: ".")
        guard parts.count == 3 else { return nil }

        var base64 = String(parts[1])
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")

        let remainder = base64.count % 4
        if remainder > 0 {
            base64 += String(repeating: "=", count: 4 - remainder)
        }

        guard
            let data = Data(base64Encoded: base64),
            let claims = try? JSONDecoder().decode(JWTClaims.self, from: data)
        else {
            return nil
        }

        return claims
    }

    static func isExpired(_ token: String?, leeway: TimeInterval = 0) -> Bool {
        guard let exp = decode(token)?.exp else { return false }
        return Date().timeIntervalSince1970 + leeway >= exp
    }
}

enum PortalFormatters {
    static func currency(_ amount: Double, code: String = "USD", fallbackSymbol: String = "$") -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = code
        formatter.locale = Locale(identifier: "en_US")
        if let formatted = formatter.string(from: NSNumber(value: amount)) {
            return formatted
        }
        return "\(fallbackSymbol)\(String(format: "%.2f", amount))"
    }

    static func shortDate(_ isoLikeString: String) -> String {
        if let date = parsePortalDate(isoLikeString) {
            return date.formatted(.dateTime.month(.abbreviated).day().year())
        }
        return isoLikeString
    }

    static func memberTime(_ isoLikeString: String) -> String {
        if let date = parseISODate(isoLikeString) ?? parsePortalDate(isoLikeString) {
            return date.formatted(.dateTime.month(.abbreviated).day().year())
        }
        return isoLikeString
    }

    static func syncTime(_ isoLikeString: String) -> String {
        if let date = parseISODate(isoLikeString) ?? parsePortalDate(isoLikeString) {
            return date.formatted(.dateTime.hour().minute().second())
        }
        return "--"
    }

    static func topUpTime(_ isoLikeString: String) -> String {
        if let date = parseISODate(isoLikeString) ?? parsePortalDate(isoLikeString) {
            return date.formatted(.dateTime.month(.abbreviated).day().hour().minute())
        }
        return isoLikeString
    }

    static func portalTimestamp(_ rawValue: String) -> Date? {
        parsePortalDate(rawValue)
    }

    private static func parseISODate(_ value: String) -> Date? {
        ISO8601DateFormatter().date(from: value)
    }

    private static func parsePortalDate(_ value: String) -> Date? {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd HH:mm"
        return formatter.date(from: value)
    }
}

// =============================================================================
// MARK: - Glass Portal Card
// =============================================================================

struct PortalCard<Content: View>: View {
    let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(20)
            .background(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .fill(.ultraThinMaterial)
                    .overlay(
                        RoundedRectangle(cornerRadius: 24, style: .continuous)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color.white.opacity(0.8),
                                        Color.white.opacity(0.3),
                                        Color.white.opacity(0.15)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                    .shadow(color: ChargingTheme.glassShadow, radius: 20, y: 8)
            )
    }
}

// =============================================================================
// MARK: - Glass Portal Badge
// =============================================================================

struct PortalBadge: View {
    let title: String
    let tint: Color

    var body: some View {
        Text(title)
            .font(.caption.weight(.semibold))
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(.ultraThinMaterial, in: Capsule())
            .foregroundStyle(tint)
            .overlay(Capsule().stroke(tint.opacity(0.25), lineWidth: 1))
    }
}

// =============================================================================
// MARK: - ElectraHub Branding (Glass style)
// =============================================================================

enum ElectraHubLogoStyle {
    case compact
    case detailed
}

struct ElectraHubLogo: View {
    var size: CGFloat = 40
    var style: ElectraHubLogoStyle = .compact

    var body: some View {
        Group {
            if UIImage(named: "ElectraHubIcon") != nil {
                Image("ElectraHubIcon")
                    .resizable()
                    .scaledToFit()
            } else {
                ZStack {
                    RoundedRectangle(cornerRadius: size * 0.25, style: .continuous)
                        .fill(
                            LinearGradient(
                                colors: [ChargingTheme.neonCyan, ChargingTheme.neonBlue],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )

                    Image(systemName: "bolt.fill")
                        .font(.system(size: size * 0.45, weight: .bold))
                        .foregroundStyle(.white)
                }
            }
        }
        .frame(width: size, height: size)
        .accessibilityLabel("Electra Hub logo")
    }
}

struct ElectraHubLogoFull: View {
    var height: CGFloat = 56

    var body: some View {
        Group {
            if UIImage(named: "ElectraHubLogo") != nil {
                Image("ElectraHubLogo")
                    .resizable()
                    .scaledToFit()
            } else {
                HStack(spacing: height * 0.2) {
                    ElectraHubLogo(size: height * 0.7, style: .detailed)

                    Text("ElectraHub")
                        .font(.system(size: height * 0.4, weight: .bold, design: .rounded))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [ChargingTheme.neonCyan, ChargingTheme.neonBlue],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                }
                .frame(height: height)
            }
        }
        .frame(height: height)
        .accessibilityLabel("Electra Hub logo")
    }
}

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
