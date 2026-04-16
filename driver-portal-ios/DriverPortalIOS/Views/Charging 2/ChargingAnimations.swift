import SwiftUI

// =============================================================================
// MARK: - Glass Theme Colors (Apple Glass / visionOS inspired)
// =============================================================================

/// Central palette for the frosted glass UI across the entire app.
enum ChargingTheme {
    // Background tones (soft, luminous)
    static let backgroundTop    = Color(red: 0.93, green: 0.95, blue: 1.0)
    static let backgroundBottom = Color(red: 0.96, green: 0.94, blue: 1.0)

    // Card / surface
    static let cardFill         = Color.white.opacity(0.55)
    static let cardBorder       = Color.white.opacity(0.7)

    // Accent colors (softer, luminous versions)
    static let neonCyan         = Color(red: 0.20, green: 0.60, blue: 0.98)   // Soft sky blue
    static let neonGreen        = Color(red: 0.20, green: 0.78, blue: 0.55)   // Soft mint-green
    static let neonBlue         = Color(red: 0.35, green: 0.40, blue: 0.95)   // Soft indigo

    // Text
    static let dimText          = Color(red: 0.45, green: 0.47, blue: 0.52)
    static let brightText       = Color(red: 0.10, green: 0.11, blue: 0.14)

    // Tile / secondary surface
    static let tileBg           = Color.white.opacity(0.45)

    // Glass-specific
    static let glassStroke      = Color.white.opacity(0.65)
    static let glassShadow      = Color(red: 0.55, green: 0.55, blue: 0.75).opacity(0.12)
    static let meshBlue         = Color(red: 0.55, green: 0.75, blue: 1.0)
    static let meshPurple       = Color(red: 0.76, green: 0.60, blue: 1.0)
    static let meshTeal         = Color(red: 0.45, green: 0.90, blue: 0.85)
    static let meshPink         = Color(red: 1.0,  green: 0.65, blue: 0.78)
}

// =============================================================================
// MARK: - Animated Mesh Gradient Background
// =============================================================================

/// Full-screen animated mesh-gradient background with soft, slowly drifting color blobs.
/// Emulates the visionOS window-backing aesthetic.
struct SpaceBackground: View {
    @State private var phase: CGFloat = 0

    var body: some View {
        ZStack {
            // Base gradient
            LinearGradient(
                colors: [
                    Color(red: 0.94, green: 0.96, blue: 1.0),
                    Color(red: 0.96, green: 0.95, blue: 1.0),
                    Color(red: 0.93, green: 0.97, blue: 0.99)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            .ignoresSafeArea()

            // Mesh blob layer
            Canvas { context, size in
                let w = size.width
                let h = size.height
                let t = phase

                // Blob 1 — Blue
                let x1 = w * (0.25 + 0.15 * sin(t * 0.7))
                let y1 = h * (0.20 + 0.12 * cos(t * 0.5))
                let r1 = min(w, h) * 0.38
                context.fill(
                    Path(ellipseIn: CGRect(x: x1 - r1, y: y1 - r1, width: r1 * 2, height: r1 * 2)),
                    with: .color(ChargingTheme.meshBlue.opacity(0.35))
                )

                // Blob 2 — Purple
                let x2 = w * (0.72 + 0.12 * cos(t * 0.6 + 1))
                let y2 = h * (0.35 + 0.15 * sin(t * 0.8 + 2))
                let r2 = min(w, h) * 0.32
                context.fill(
                    Path(ellipseIn: CGRect(x: x2 - r2, y: y2 - r2, width: r2 * 2, height: r2 * 2)),
                    with: .color(ChargingTheme.meshPurple.opacity(0.30))
                )

                // Blob 3 — Teal
                let x3 = w * (0.50 + 0.18 * sin(t * 0.55 + 3))
                let y3 = h * (0.70 + 0.12 * cos(t * 0.65 + 1))
                let r3 = min(w, h) * 0.35
                context.fill(
                    Path(ellipseIn: CGRect(x: x3 - r3, y: y3 - r3, width: r3 * 2, height: r3 * 2)),
                    with: .color(ChargingTheme.meshTeal.opacity(0.28))
                )

                // Blob 4 — Pink
                let x4 = w * (0.30 + 0.10 * cos(t * 0.45 + 2))
                let y4 = h * (0.55 + 0.10 * sin(t * 0.75 + 4))
                let r4 = min(w, h) * 0.25
                context.fill(
                    Path(ellipseIn: CGRect(x: x4 - r4, y: y4 - r4, width: r4 * 2, height: r4 * 2)),
                    with: .color(ChargingTheme.meshPink.opacity(0.22))
                )
            }
            .blur(radius: 80)
            .ignoresSafeArea()
            .onAppear {
                withAnimation(.linear(duration: 20).repeatForever(autoreverses: true)) {
                    phase = .pi * 2
                }
            }

            // Subtle noise / grain overlay
            Color.white.opacity(0.03)
                .ignoresSafeArea()
        }
    }
}

// =============================================================================
// MARK: - Glass Card Background Helper
// =============================================================================

/// A reusable frosted glass card shape with inner highlight stroke.
struct GlassCardBackground: View {
    var cornerRadius: CGFloat = 24

    var body: some View {
        RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
            .fill(.ultraThinMaterial)
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
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
    }
}

// =============================================================================
// MARK: - Energy Flow Lines (Glass Style)
// =============================================================================

/// Soft, luminous energy lines that radiate outward from the gauge area.
struct EnergyCircuitLines: View {
    let isCharging: Bool

    @State private var flow: CGFloat = 0
    @State private var glow = false

    var body: some View {
        if isCharging {
            ZStack {
                EnergyLine(angle: 0, length: 140, delay: 0, flow: flow, glow: glow)
                EnergyLine(angle: 180, length: 120, delay: 0.3, flow: flow, glow: glow)
                EnergyLine(angle: 35, length: 100, delay: 0.6, flow: flow, glow: glow)
                EnergyLine(angle: 210, length: 90, delay: 0.9, flow: flow, glow: glow)
                EnergyLine(angle: 90, length: 110, delay: 0.2, flow: flow, glow: glow)
            }
            .onAppear {
                withAnimation(.linear(duration: 2).repeatForever(autoreverses: false)) {
                    flow = 1
                }
                withAnimation(.easeInOut(duration: 1.5).repeatForever(autoreverses: true)) {
                    glow = true
                }
            }
            .allowsHitTesting(false)
        }
    }
}

private struct EnergyLine: View {
    let angle: Double
    let length: CGFloat
    let delay: CGFloat
    let flow: CGFloat
    let glow: Bool

    var body: some View {
        Rectangle()
            .fill(
                LinearGradient(
                    colors: [
                        ChargingTheme.neonCyan.opacity(glow ? 0.5 : 0.2),
                        ChargingTheme.neonBlue.opacity(glow ? 0.3 : 0.08),
                        Color.clear
                    ],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .frame(width: length, height: 1.5)
            .overlay {
                Circle()
                    .fill(ChargingTheme.neonCyan.opacity(0.8))
                    .frame(width: 4, height: 4)
                    .blur(radius: 2)
                    .offset(x: -length / 2 + length * ((flow + delay).truncatingRemainder(dividingBy: 1.0)))
            }
            .shadow(color: ChargingTheme.neonCyan.opacity(0.3), radius: 6, y: 0)
            .rotationEffect(.degrees(angle))
            .offset(
                x: cos(angle * .pi / 180) * 105,
                y: sin(angle * .pi / 180) * 105
            )
    }
}

// =============================================================================
// MARK: - Glass Gauge Ring
// =============================================================================

/// A translucent gauge ring with frosted glass aesthetic,
/// soft glow arc, and clean readout.
struct MetallicGaugeRing: View {
    let currentPowerKw: Double
    let maxPower: Double
    let energyFlash: Bool

    @State private var shimmer: Double = 0

    private var powerRatio: Double {
        min(currentPowerKw / maxPower, 1.0)
    }

    var body: some View {
        ZStack {
            // Outer frosted ring
            Circle()
                .stroke(
                    AngularGradient(
                        colors: [
                            Color.white.opacity(0.5),
                            Color(red: 0.85, green: 0.88, blue: 0.95).opacity(0.3),
                            Color.white.opacity(0.6),
                            Color(red: 0.85, green: 0.85, blue: 0.92).opacity(0.25),
                            Color.white.opacity(0.5)
                        ],
                        center: .center,
                        startAngle: .degrees(shimmer),
                        endAngle: .degrees(shimmer + 360)
                    ),
                    lineWidth: 18
                )
                .frame(width: 200, height: 200)

            // Inner soft ring
            Circle()
                .stroke(Color.white.opacity(0.15), lineWidth: 12)
                .frame(width: 200, height: 200)

            // Background arc track
            Circle()
                .trim(from: 0.12, to: 0.88)
                .stroke(ChargingTheme.neonCyan.opacity(0.08), style: StrokeStyle(lineWidth: 10, lineCap: .round))
                .frame(width: 200, height: 200)
                .rotationEffect(.degrees(90))

            // Active power arc
            Circle()
                .trim(from: 0.12, to: 0.12 + 0.76 * powerRatio)
                .stroke(
                    LinearGradient(
                        colors: [ChargingTheme.neonGreen, ChargingTheme.neonCyan, ChargingTheme.neonBlue],
                        startPoint: .leading,
                        endPoint: .trailing
                    ),
                    style: StrokeStyle(lineWidth: 8, lineCap: .round)
                )
                .frame(width: 200, height: 200)
                .rotationEffect(.degrees(90))
                .shadow(color: ChargingTheme.neonCyan.opacity(0.4), radius: 10)
                .animation(.spring(duration: 0.8), value: currentPowerKw)

            // Flash burst ring on meter event
            Circle()
                .stroke(
                    ChargingTheme.neonCyan.opacity(energyFlash ? 0.5 : 0),
                    lineWidth: energyFlash ? 2 : 14
                )
                .frame(width: 220, height: 220)
                .scaleEffect(energyFlash ? 1.15 : 1.0)
                .blur(radius: energyFlash ? 8 : 0)
                .animation(.easeOut(duration: 0.5), value: energyFlash)

            // Center readout
            VStack(spacing: 2) {
                Text(String(format: "%.1f", currentPowerKw))
                    .font(.system(size: 48, weight: .bold, design: .rounded))
                    .foregroundStyle(ChargingTheme.brightText)
                    .contentTransition(.numericText())
                    .shadow(color: ChargingTheme.neonCyan.opacity(energyFlash ? 0.4 : 0), radius: 8)

                Text("kW")
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(ChargingTheme.dimText)
            }
        }
        .onAppear {
            withAnimation(.linear(duration: 8).repeatForever(autoreverses: false)) {
                shimmer = 360
            }
        }
    }
}

// =============================================================================
// MARK: - Pulse Ring (Glass Style)
// =============================================================================

struct NeonPulseRing: View {
    let isCharging: Bool

    @State private var expand = false

    var body: some View {
        if isCharging {
            ZStack {
                Circle()
                    .stroke(ChargingTheme.neonCyan.opacity(expand ? 0 : 0.25), lineWidth: expand ? 1 : 2)
                    .frame(width: 210, height: 210)
                    .scaleEffect(expand ? 1.5 : 1.0)

                Circle()
                    .stroke(ChargingTheme.neonBlue.opacity(expand ? 0 : 0.15), lineWidth: expand ? 0.5 : 1.5)
                    .frame(width: 210, height: 210)
                    .scaleEffect(expand ? 1.8 : 1.0)
            }
            .animation(.easeOut(duration: 2.0).repeatForever(autoreverses: false), value: expand)
            .onAppear { expand = true }
            .allowsHitTesting(false)
        }
    }
}

// =============================================================================
// MARK: - Electrifying Overlay (Glass)
// =============================================================================

struct ElectrifyingOverlay: View {
    let triggerCount: Int

    @State private var flash = false
    @State private var ringExpand = false

    var body: some View {
        ZStack {
            // Radial flash
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .fill(
                    RadialGradient(
                        colors: [
                            ChargingTheme.neonCyan.opacity(flash ? 0.15 : 0),
                            ChargingTheme.neonBlue.opacity(flash ? 0.06 : 0),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 250
                    )
                )

            // Expanding ring burst
            Circle()
                .stroke(ChargingTheme.neonCyan.opacity(ringExpand ? 0 : 0.35), lineWidth: ringExpand ? 0.5 : 2)
                .frame(width: ringExpand ? 350 : 40, height: ringExpand ? 350 : 40)

            // Edge glow
            RoundedRectangle(cornerRadius: 24, style: .continuous)
                .stroke(
                    LinearGradient(
                        colors: [
                            ChargingTheme.neonCyan.opacity(flash ? 0.3 : 0),
                            ChargingTheme.neonBlue.opacity(flash ? 0.15 : 0),
                            ChargingTheme.neonCyan.opacity(flash ? 0.2 : 0)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: flash ? 1.5 : 0
                )
                .blur(radius: flash ? 4 : 0)
        }
        .allowsHitTesting(false)
        .onChange(of: triggerCount) { _, _ in
            ringExpand = false
            withAnimation(.easeIn(duration: 0.06)) { flash = true }
            withAnimation(.easeOut(duration: 0.6)) { ringExpand = true }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.12) {
                withAnimation(.easeOut(duration: 0.5)) { flash = false }
            }
        }
    }
}

// =============================================================================
// MARK: - Charging Complete Celebration
// =============================================================================

struct ChargingCompleteCelebration: View {
    let trigger: Bool

    @State private var particles: [CelebrationParticle] = []
    @State private var showCheckmark = false
    @State private var checkmarkScale: CGFloat = 0

    var body: some View {
        ZStack {
            ForEach(particles) { particle in
                Circle()
                    .fill(particle.color)
                    .frame(width: particle.size, height: particle.size)
                    .shadow(color: particle.color.opacity(0.5), radius: 4)
                    .offset(x: particle.x, y: particle.y)
                    .opacity(particle.opacity)
            }

            if showCheckmark {
                ZStack {
                    Circle()
                        .fill(ChargingTheme.neonGreen.opacity(0.12))
                        .frame(width: 90, height: 90)
                        .scaleEffect(checkmarkScale)
                        .blur(radius: 10)

                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 52, weight: .bold))
                        .foregroundStyle(ChargingTheme.neonGreen)
                        .shadow(color: ChargingTheme.neonGreen.opacity(0.35), radius: 12)
                        .scaleEffect(checkmarkScale)
                }
            }
        }
        .allowsHitTesting(false)
        .onChange(of: trigger) { _, isComplete in
            if isComplete { launchCelebration() }
        }
    }

    private func launchCelebration() {
        let colors: [Color] = [ChargingTheme.neonCyan, ChargingTheme.neonGreen, ChargingTheme.neonBlue, ChargingTheme.meshPurple, ChargingTheme.meshTeal]
        var newParticles: [CelebrationParticle] = []
        for i in 0..<24 {
            let angle = Double(i) / 24.0 * 360.0
            let distance = CGFloat.random(in: 60...180)
            newParticles.append(CelebrationParticle(
                id: i, color: colors[i % colors.count],
                size: CGFloat.random(in: 4...10),
                x: 0, y: 0,
                targetX: cos(angle * .pi / 180) * distance,
                targetY: sin(angle * .pi / 180) * distance,
                opacity: 1.0
            ))
        }
        particles = newParticles

        withAnimation(.easeOut(duration: 0.8)) {
            particles = particles.map { var p = $0; p.x = p.targetX; p.y = p.targetY; return p }
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            withAnimation(.easeOut(duration: 0.6)) {
                particles = particles.map { var p = $0; p.opacity = 0; return p }
            }
        }

        showCheckmark = true
        withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) { checkmarkScale = 1.0 }
        Haptics.impact(.heavy)

        DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
            withAnimation(.easeOut(duration: 0.4)) { checkmarkScale = 0 }
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { showCheckmark = false; particles = [] }
        }
    }
}

struct CelebrationParticle: Identifiable {
    let id: Int
    let color: Color
    let size: CGFloat
    var x: CGFloat
    var y: CGFloat
    var targetX: CGFloat = 0
    var targetY: CGFloat = 0
    var opacity: Double
}

// =============================================================================
// MARK: - Elapsed Time Counter
// =============================================================================

struct ElapsedTimeView: View {
    let startedAt: String
    let isActive: Bool

    @State private var elapsed: TimeInterval = 0
    @State private var colonBlink = true

    private let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    private var startDate: Date? {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter.date(from: startedAt) ?? ISO8601DateFormatter().date(from: startedAt)
    }

    private var hours: Int { Int(elapsed) / 3600 }
    private var minutes: Int { (Int(elapsed) % 3600) / 60 }
    private var seconds: Int { Int(elapsed) % 60 }

    var body: some View {
        HStack(spacing: 2) {
            if hours > 0 {
                Text(String(format: "%d", hours))
                    .contentTransition(.numericText())
                Text(":")
                    .opacity(colonBlink ? 1 : 0.3)
            }
            Text(String(format: "%02d", minutes))
                .contentTransition(.numericText())
            Text(":")
                .opacity(colonBlink ? 1 : 0.3)
            Text(String(format: "%02d", seconds))
                .contentTransition(.numericText())
        }
        .font(.system(.caption, design: .monospaced).weight(.bold))
        .foregroundStyle(ChargingTheme.neonCyan)
        .onReceive(timer) { _ in
            guard isActive, let start = startDate else { return }
            withAnimation(.easeInOut(duration: 0.2)) {
                elapsed = Date().timeIntervalSince(start)
                colonBlink.toggle()
            }
        }
        .onAppear {
            if let start = startDate { elapsed = max(0, Date().timeIntervalSince(start)) }
        }
    }
}

// =============================================================================
// MARK: - Idle Plug Animation
// =============================================================================

struct IdlePlugAnimation: View {
    @State private var breathe = false
    @State private var rotate = false

    var body: some View {
        ZStack {
            Circle()
                .stroke(ChargingTheme.neonCyan.opacity(0.12), lineWidth: 1)
                .frame(width: 120, height: 120)
                .scaleEffect(breathe ? 1.15 : 0.95)

            Circle()
                .stroke(ChargingTheme.neonBlue.opacity(0.08), lineWidth: 1)
                .frame(width: 100, height: 100)
                .rotationEffect(.degrees(rotate ? 360 : 0))

            Image(systemName: "ev.plug.dc.ccs2")
                .font(.system(size: 52))
                .foregroundStyle(
                    LinearGradient(
                        colors: [ChargingTheme.dimText, ChargingTheme.neonCyan.opacity(0.5)],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .scaleEffect(breathe ? 1.03 : 0.97)
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 2.5).repeatForever(autoreverses: true)) { breathe = true }
            withAnimation(.linear(duration: 12).repeatForever(autoreverses: false)) { rotate = true }
        }
    }
}

// =============================================================================
// MARK: - Shimmer Modifier
// =============================================================================

struct ShimmerModifier: ViewModifier {
    @State private var phase: CGFloat = -1

    func body(content: Content) -> some View {
        content
            .overlay {
                LinearGradient(
                    colors: [
                        Color.white.opacity(0),
                        Color.white.opacity(0.25),
                        Color.white.opacity(0)
                    ],
                    startPoint: .init(x: phase - 0.3, y: 0.5),
                    endPoint: .init(x: phase + 0.3, y: 0.5)
                )
                .blendMode(.screen)
            }
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .onAppear {
                withAnimation(.linear(duration: 1.6).repeatForever(autoreverses: false)) { phase = 2 }
            }
    }
}

extension View {
    func shimmerEffect() -> some View { modifier(ShimmerModifier()) }
}
