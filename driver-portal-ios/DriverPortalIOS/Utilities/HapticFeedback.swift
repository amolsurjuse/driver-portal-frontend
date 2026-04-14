import UIKit

// MARK: - Haptic Feedback Utility

enum Haptics {
    static func impact(_ style: UIImpactFeedbackGenerator.FeedbackStyle = .medium) {
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.impactOccurred()
    }

    static func notification(_ type: UINotificationFeedbackGenerator.FeedbackType) {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(type)
    }

    static func selection() {
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }

    /// Trigger a success haptic (use after completing an action like top-up, stop session)
    static func success() {
        notification(.success)
    }

    /// Trigger a warning haptic (use before destructive actions)
    static func warning() {
        notification(.warning)
    }

    /// Trigger an error haptic (use after a failed action)
    static func error() {
        notification(.error)
    }
}
