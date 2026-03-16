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
                    .fill(.white)
                    .shadow(color: Color.black.opacity(0.06), radius: 22, x: 0, y: 14)
            )
    }
}

struct PortalBadge: View {
    let title: String
    let tint: Color

    var body: some View {
        Text(title)
            .font(.caption.weight(.semibold))
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(tint.opacity(0.12))
            .foregroundStyle(tint)
            .clipShape(Capsule())
    }
}

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}
