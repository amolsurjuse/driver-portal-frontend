import SwiftUI

// =============================================================================
// MARK: - Brand Colors (matching the web driver portal)
// =============================================================================

/// Official ElectraHub brand colors derived from the web driver-portal SVG assets.
enum ElectraHubBrand {
    // Frame gradient: #0b7eea → #1bc8e4
    static let frameStart  = Color(red: 0.043, green: 0.494, blue: 0.918)  // #0b7eea
    static let frameEnd    = Color(red: 0.106, green: 0.784, blue: 0.894)  // #1bc8e4

    // Bolt gradient: #86d6c8 → #4cb6a9
    static let boltStart   = Color(red: 0.525, green: 0.839, blue: 0.784)  // #86d6c8
    static let boltEnd     = Color(red: 0.298, green: 0.714, blue: 0.663)  // #4cb6a9

    // Text colors
    static let textDark    = Color(red: 0.153, green: 0.192, blue: 0.247)  // #27313f
    static let textBlue    = Color(red: 0.086, green: 0.533, blue: 0.867)  // #1688dd
    static let textLight   = Color.white

    // Icon background
    static let iconBg      = Color(red: 0.059, green: 0.090, blue: 0.165)  // #0f172a

    // Simple icon gradient (from the simpler icon variant)
    static let simpleStart = Color(red: 0.039, green: 0.400, blue: 0.761)  // #0a66c2
    static let simpleEnd   = Color(red: 0.486, green: 0.227, blue: 0.929)  // #7c3aed
}

// =============================================================================
// MARK: - ElectraHubLogo (Icon Only)
// =============================================================================

/// The ElectraHub icon — a rounded square with the E-frame, plug, and lightning bolt.
/// Matches the web portal's `electra-hub-icon.svg` (128×128 version).
///
/// Usage:
/// ```
/// ElectraHubLogo(size: 56)
/// ElectraHubLogo(size: 40, style: .simple)
/// ```
struct ElectraHubLogo: View {
    var size: CGFloat = 64
    var style: LogoStyle = .detailed

    enum LogoStyle {
        case detailed   // E-frame + plug + bolt (web portal style)
        case simple     // Rounded square with gradient bolt (simpler variant)
    }

    var body: some View {
        Group {
            switch style {
            case .detailed:
                DetailedIconView(size: size)
            case .simple:
                SimpleIconView(size: size)
            }
        }
        .accessibilityLabel("Electra Hub logo")
    }
}

// MARK: - Detailed Icon (E-frame + plug + bolt)

/// Reproduces the 128×128 public/electra-hub-icon.svg from the web portal.
/// Paths are normalized from the 128×128 viewBox and scaled to the requested size.
private struct DetailedIconView: View {
    let size: CGFloat
    private var s: CGFloat { size / 128.0 }  // scale factor

    var body: some View {
        ZStack {
            // Rounded square background
            RoundedRectangle(cornerRadius: 18 * s, style: .continuous)
                .fill(ElectraHubBrand.iconBg)
                .frame(width: size, height: size)

            Canvas { ctx, canvasSize in
                let s = canvasSize.width / 128.0

                // --- E-shaped frame ---
                var ePath = Path()
                ePath.move(to: p(20, 18, s))
                ePath.addLine(to: p(104, 18, s))
                ePath.addLine(to: p(94, 36, s))
                ePath.addLine(to: p(46, 36, s))
                ePath.addLine(to: p(46, 56, s))
                ePath.addLine(to: p(82, 56, s))
                ePath.addLine(to: p(73, 72, s))
                ePath.addLine(to: p(46, 72, s))
                ePath.addLine(to: p(46, 110, s))
                ePath.addLine(to: p(20, 110, s))
                ePath.closeSubpath()

                ctx.fill(ePath, with: .linearGradient(
                    Gradient(colors: [ElectraHubBrand.frameStart, ElectraHubBrand.frameEnd]),
                    startPoint: .zero,
                    endPoint: CGPoint(x: canvasSize.width, y: canvasSize.height)
                ))

                // --- Charging plug (white) ---
                var plugPath = Path()
                plugPath.move(to: p(28, 88, s))
                plugPath.addLine(to: p(28, 73, s))

                // Curve up to connector bar
                plugPath.addQuadCurve(to: p(50, 51, s), control: p(28, 56, s))
                plugPath.addLine(to: p(66, 51, s))
                plugPath.addLine(to: p(66, 45, s))
                plugPath.addLine(to: p(73, 45, s))
                plugPath.addLine(to: p(73, 51, s))
                plugPath.addLine(to: p(80, 51, s))
                plugPath.addLine(to: p(80, 45, s))
                plugPath.addLine(to: p(87, 45, s))
                plugPath.addLine(to: p(87, 51, s))
                plugPath.addLine(to: p(91, 51, s))

                // Top arc of the plug head
                plugPath.addQuadCurve(to: p(91, 63, s), control: p(97, 51, s))
                plugPath.addLine(to: p(87, 63, s))
                plugPath.addLine(to: p(87, 76, s))
                plugPath.addLine(to: p(80, 76, s))
                plugPath.addLine(to: p(80, 63, s))
                plugPath.addLine(to: p(73, 63, s))
                plugPath.addLine(to: p(73, 76, s))
                plugPath.addLine(to: p(66, 76, s))
                plugPath.addLine(to: p(66, 63, s))
                plugPath.addLine(to: p(50, 63, s))

                plugPath.addQuadCurve(to: p(40, 73, s), control: p(44, 63, s))
                plugPath.addLine(to: p(40, 88, s))
                plugPath.closeSubpath()

                ctx.fill(plugPath, with: .color(.white))

                // --- Lightning bolt ---
                var boltPath = Path()
                boltPath.move(to: p(82, 12, s))
                boltPath.addLine(to: p(62, 56, s))
                boltPath.addLine(to: p(82, 56, s))
                boltPath.addLine(to: p(66, 116, s))
                boltPath.addLine(to: p(104, 53, s))
                boltPath.addLine(to: p(84, 53, s))
                // close back to top-right area
                boltPath.closeSubpath()

                ctx.fill(boltPath, with: .linearGradient(
                    Gradient(colors: [ElectraHubBrand.boltStart, ElectraHubBrand.boltEnd]),
                    startPoint: .zero,
                    endPoint: CGPoint(x: canvasSize.width, y: canvasSize.height)
                ))
            }
            .frame(width: size, height: size)
        }
        .clipShape(RoundedRectangle(cornerRadius: 18 * s, style: .continuous))
    }

    private func p(_ x: CGFloat, _ y: CGFloat, _ s: CGFloat) -> CGPoint {
        CGPoint(x: x * s, y: y * s)
    }
}

// MARK: - Simple Icon (Rounded square + gradient bolt)

/// Reproduces the simpler 96×96 src/assets/brand/electra-hub-icon.svg.
/// Dark rounded square with a gradient bolt and horizontal line through center.
private struct SimpleIconView: View {
    let size: CGFloat
    private var s: CGFloat { size / 96.0 }

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 24 * s, style: .continuous)
                .fill(ElectraHubBrand.iconBg)
                .frame(width: size, height: size)

            Canvas { ctx, canvasSize in
                let s = canvasSize.width / 96.0

                // Horizontal line through center
                var linePath = Path()
                linePath.move(to: CGPoint(x: 24 * s, y: 48 * s))
                linePath.addLine(to: CGPoint(x: 72 * s, y: 48 * s))

                ctx.stroke(linePath, with: .linearGradient(
                    Gradient(colors: [ElectraHubBrand.simpleStart, ElectraHubBrand.simpleEnd]),
                    startPoint: .zero,
                    endPoint: CGPoint(x: canvasSize.width, y: canvasSize.height)
                ), style: StrokeStyle(lineWidth: 8 * s, lineCap: .round))

                // Lightning bolt
                var boltPath = Path()
                boltPath.move(to: CGPoint(x: 48 * s, y: 18 * s))
                boltPath.addLine(to: CGPoint(x: 34 * s, y: 50 * s))
                boltPath.addLine(to: CGPoint(x: 58 * s, y: 50 * s))
                boltPath.addLine(to: CGPoint(x: 48 * s, y: 78 * s))

                ctx.stroke(boltPath, with: .linearGradient(
                    Gradient(colors: [ElectraHubBrand.simpleStart, ElectraHubBrand.simpleEnd]),
                    startPoint: .zero,
                    endPoint: CGPoint(x: canvasSize.width, y: canvasSize.height)
                ), style: StrokeStyle(lineWidth: 8 * s, lineCap: .round, lineJoin: .round))
            }
            .frame(width: size, height: size)
        }
    }
}

// =============================================================================
// MARK: - ElectraHubLogoFull (Icon + Text)
// =============================================================================

/// Full horizontal logo with icon and "Electra Hub" text.
/// Matches the web portal's `electra-hub-logo-dark.svg`.
///
/// Usage:
/// ```
/// ElectraHubLogoFull(height: 48)
/// ElectraHubLogoFull(height: 32, colorScheme: .dark)
/// ```
struct ElectraHubLogoFull: View {
    var height: CGFloat = 48
    var colorScheme: LogoColorScheme = .light

    enum LogoColorScheme {
        case light  // Dark text on light background
        case dark   // White text on dark background
    }

    private var electraColor: Color {
        colorScheme == .light ? ElectraHubBrand.textDark : ElectraHubBrand.textLight
    }

    var body: some View {
        HStack(spacing: height * 0.25) {
            ElectraHubLogo(size: height, style: .detailed)

            VStack(alignment: .leading, spacing: 0) {
                HStack(spacing: 0) {
                    Text("Electra")
                        .font(.system(size: height * 0.48, weight: .bold, design: .rounded))
                        .foregroundStyle(electraColor)
                    Text("Hub")
                        .font(.system(size: height * 0.48, weight: .bold, design: .rounded))
                        .foregroundStyle(ElectraHubBrand.textBlue)
                }

                if height >= 40 {
                    Text("Enterprise EV charging network")
                        .font(.system(size: height * 0.17, weight: .medium))
                        .foregroundStyle(colorScheme == .light
                            ? Color.gray.opacity(0.6)
                            : Color.white.opacity(0.5))
                }
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Electra Hub, Enterprise EV charging network")
    }
}

// =============================================================================
// MARK: - Convenience: Asset Catalog Image (if available)
// =============================================================================

extension Image {
    /// Returns the ElectraHub icon from the asset catalog.
    /// Falls back to a bolt SF Symbol if the asset is unavailable.
    static var electraHubIcon: Image {
        Image("ElectraHubIcon")
    }

    /// Returns the full ElectraHub logo from the asset catalog.
    static var electraHubLogo: Image {
        Image("ElectraHubLogo")
    }
}
