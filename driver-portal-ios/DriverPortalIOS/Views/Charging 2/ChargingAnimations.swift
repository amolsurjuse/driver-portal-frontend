import SwiftUI

// MARK: - Ambient Energy Field

/// A layered pulsing radial gradient that sits behind the session card
/// to convey "energy flowing" while a session is active.
struct ChargingEnergyField: View {
    let isCharging: Bool

    @State private var pulse = false
    @State private var rotate = false

    var body: some View {
        if isCharging {
            ZStack {
                // Primary pulsing field
                RadialGradient(
                    colors: [
                        Color.cyan.opacity(pulse ? 0.10 : 0.03),
                        Color.blue.opacity(pulse ? 0.05 : 0.01),
                        Color.clear
                    ],
                    center: .center,
                    startRadius: 20,
                    endRadius: 300
                )
                .scaleEffect(pulse ? 1.12 : 0.92)

                // Rotating accent ring
                Circle()
                    .trim(from: 0.0, to: 0.3)
                    .stroke(
                        LinearGradient(
                            colors: [Color.cyan.opacity(0.15), Color.clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        ),
                        style: StrokeStyle(lineWidth: 2, lineCap: .round)
                    )
                    .frame(width: 260, height: 260)
                    .rotationEffect(.degrees(rotate ? 360 : 0))

                // Counter-rotating accent
                Circle()
                    .trim(from: 0.0, to: 0.2)
                    .stroke(
                        LinearGradient(
                            colors: [Color.blue.opacity(0.10), Color.clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        ),
                        style: StrokeStyle(lineWidth: 1.5, lineCap: .round)
                    )
                    .frame(width: 320, height: 320)
                    .rotationEffect(.degrees(rotate ? -360 : 0))
            }
            .animation(.easeInOut(duration: 2.5).repeatForever(autoreverses: true), value: pulse)
            .animation(.linear(duration: 8).repeatForever(autoreverses: false), value: rotate)
            .onAppear {
                pulse = true
                rotate = true
            }
            .allowsHitTesting(false)
        }
    }
}

// MARK: - Electrifying Overlay

/// A multi-layered flash overlay that fires every time `triggerCount` changes,
/// simulating an electric pulse on each meter-value SSE event.
struct ElectrifyingOverlay: View {
    let triggerCount: Int

    @State private var flash = false
    @State private var ringExpand = false

    var body: some View {
        ZStack {
            // Primary radial flash
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(
                    RadialGradient(
                        colors: [
                            Color.cyan.opacity(flash ? 0.30 : 0),
                            Color.blue.opacity(flash ? 0.12 : 0),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 200
                    )
                )
                .scaleEffect(flash ? 1.06 : 1.0)

            // Expanding ring burst
            Circle()
                .stroke(Color.cyan.opacity(ringExpand ? 0 : 0.5), lineWidth: ringExpand ? 0.5 : 3)
                .frame(width: ringExpand ? 300 : 40, height: ringExpand ? 300 : 40)
                .opacity(ringExpand ? 0 : 1)

            // Edge highlight glow
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .stroke(
                    LinearGradient(
                        colors: [
                            Color.cyan.opacity(flash ? 0.4 : 0),
                            Color.blue.opacity(flash ? 0.2 : 0),
                            Color.cyan.opacity(flash ? 0.3 : 0)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: flash ? 2 : 0
                )
                .blur(radius: flash ? 4 : 0)
        }
        .allowsHitTesting(false)
        .onChange(of: triggerCount) { _, _ in
            // Reset ring for fresh burst
            ringExpand = false

            // Flash sequence
            withAnimation(.easeIn(duration: 0.06)) {
                flash = true
            }

            // Start ring expansion
            withAnimation(.easeOut(duration: 0.6)) {
                ringExpand = true
            }

            // Fade out flash
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.12) {
                withAnimation(.easeOut(duration: 0.5)) {
                    flash = false
                }
            }
        }
    }
}

// MARK: - Power Pulse Ring

/// A ring that pulses proportionally to the current power level.
/// Used around the power gauge for a breathing glow effect.
struct PowerPulseRing: View {
    let powerKw: Double
    let maxPower: Double

    @State private var pulse = false

    private var intensity: Double {
        min(powerKw / maxPower, 1.0)
    }

    var body: some View {
        Circle()
            .stroke(
                LinearGradient(
                    colors: [
                        Color.green.opacity(0.3 * intensity),
                        Color.cyan.opacity(0.5 * intensity),
                        Color.blue.opacity(0.3 * intensity)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                lineWidth: pulse ? 2 : 4
            )
            .scaleEffect(pulse ? 1.15 : 1.0)
            .opacity(pulse ? 0 : 0.8)
            .animation(
                .easeInOut(duration: max(0.5, 2.0 - intensity * 1.5))
                    .repeatForever(autoreverses: false),
                value: pulse
            )
            .onAppear { pulse = true }
    }
}
