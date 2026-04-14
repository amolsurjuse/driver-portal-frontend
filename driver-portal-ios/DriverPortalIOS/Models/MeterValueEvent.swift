import Foundation

/// Represents a meter-value event received over SSE from the session service.
struct MeterValueEvent: Decodable {
    let sessionId: String?
    let stationId: String?
    let stationName: String?
    let connectorId: String?
    let connectorType: String?
    let energyDeliveredKwh: Double?
    let currentPowerKw: Double?
    let estimatedCost: Double?
    let batteryPercent: Int?
    let estimatedTimeRemainingMin: Int?
    let status: String?
    let timestamp: String?

    /// Converts this meter value event into a `LiveChargingSession`,
    /// falling back to the previous session's values for any missing fields.
    func toLiveSession(fallback: LiveChargingSession?) -> LiveChargingSession {
        LiveChargingSession(
            id: sessionId ?? fallback?.id ?? "",
            stationId: stationId ?? fallback?.stationId ?? "",
            stationName: stationName ?? fallback?.stationName ?? "",
            connectorId: connectorId ?? fallback?.connectorId ?? "",
            connectorType: connectorType ?? fallback?.connectorType ?? "",
            startedAt: fallback?.startedAt ?? "",
            energyDeliveredKwh: energyDeliveredKwh ?? fallback?.energyDeliveredKwh ?? 0,
            currentPowerKw: currentPowerKw ?? fallback?.currentPowerKw ?? 0,
            estimatedCost: estimatedCost ?? fallback?.estimatedCost ?? 0,
            batteryPercent: batteryPercent ?? fallback?.batteryPercent,
            estimatedTimeRemainingMin: estimatedTimeRemainingMin ?? fallback?.estimatedTimeRemainingMin,
            status: LiveSessionStatus(rawValue: status ?? "") ?? fallback?.status ?? .charging
        )
    }
}
