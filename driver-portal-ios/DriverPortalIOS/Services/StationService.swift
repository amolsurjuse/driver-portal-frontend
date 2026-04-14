import Foundation

// MARK: - Station Service

final class StationService {
    private let client: APIClient
    private let configuration: AppConfiguration

    init(client: APIClient, configuration: AppConfiguration) {
        self.client = client
        self.configuration = configuration
    }

    func getNearbyStations(latitude: Double, longitude: Double, radiusKm: Double = 25) async throws -> [StationLocation] {
        let request = try client.makeRequest(
            baseURL: configuration.stationBaseURL,
            path: "api/v1/stations/nearby",
            method: .get,
            query: [
                URLQueryItem(name: "lat", value: String(latitude)),
                URLQueryItem(name: "lng", value: String(longitude)),
                URLQueryItem(name: "radius", value: String(radiusKm))
            ]
        )
        return try await client.request(request)
    }

    func getStation(stationId: String) async throws -> StationLocation {
        let request = try client.makeRequest(
            baseURL: configuration.stationBaseURL,
            path: "api/v1/stations/\(stationId)",
            method: .get
        )
        return try await client.request(request)
    }

    func getAllStations(page: Int = 0, size: Int = 50) async throws -> [StationLocation] {
        let request = try client.makeRequest(
            baseURL: configuration.stationBaseURL,
            path: "api/v1/stations",
            method: .get,
            query: [
                URLQueryItem(name: "page", value: String(page)),
                URLQueryItem(name: "size", value: String(size))
            ]
        )
        return try await client.request(request)
    }
}

// MARK: - Session Service (for live charging)

final class ChargingSessionService {
    private let client: APIClient
    private let configuration: AppConfiguration
    private var sseClient: SSEClient?

    init(client: APIClient, configuration: AppConfiguration) {
        self.client = client
        self.configuration = configuration
    }

    func getActiveSessions() async throws -> [LiveChargingSession] {
        let request = try client.makeRequest(
            baseURL: configuration.sessionBaseURL,
            path: "api/v1/sessions/active",
            method: .get
        )
        return try await client.request(request)
    }

    func getSessionHistory(page: Int = 0, size: Int = 20) async throws -> [ChargingSession] {
        let request = try client.makeRequest(
            baseURL: configuration.sessionBaseURL,
            path: "api/v1/sessions/history",
            method: .get,
            query: [
                URLQueryItem(name: "page", value: String(page)),
                URLQueryItem(name: "size", value: String(size))
            ]
        )
        let historyItems: [HistorySessionResponse] = try await client.request(request)
        return historyItems.map(\.asChargingSession)
    }

    func startSession(payload: StartChargingRequest) async throws -> StartChargingResponse {
        let request = try client.makeRequest(
            baseURL: configuration.sessionBaseURL,
            path: "api/v1/sessions/start",
            method: .post,
            body: payload
        )
        return try await client.request(request)
    }

    func stopSession(sessionId: String) async throws {
        let request = try client.makeRequest(
            baseURL: configuration.sessionBaseURL,
            path: "api/v1/sessions/\(sessionId)/stop",
            method: .post,
            body: StopChargingBody(reason: "Remote", userInitiated: true)
        )
        try await client.request(request)
    }

    func getReceipt(sessionId: String) async throws -> ChargingSession {
        let request = try client.makeRequest(
            baseURL: configuration.sessionBaseURL,
            path: "api/v1/sessions/\(sessionId)/receipt",
            method: .get
        )
        let receipt: ReceiptResponse = try await client.request(request)
        return receipt.asChargingSession
    }

    /// Opens an SSE connection for live meter-value events on the given session.
    /// Returns an `AsyncStream<SSEEvent>` that yields each event as it arrives.
    ///
    /// Backend endpoint: GET /api/v1/sessions/{sessionId}/events
    /// Content-Type: text/event-stream
    func meterValueStream(sessionId: String) -> AsyncStream<SSEEvent> {
        let tokenProvider = client.getTokenProvider()
        let sse = SSEClient(tokenProvider: tokenProvider)
        self.sseClient = sse

        let url = configuration.sessionBaseURL
            .appendingPathComponent("api/v1/sessions")
            .appendingPathComponent(sessionId)
            .appendingPathComponent("events")

        return sse.connect(url: url)
    }

    /// Disconnects any active SSE stream.
    func disconnectStream() {
        sseClient?.disconnect()
        sseClient = nil
    }
}

struct StartChargingRequest: Encodable {
    let chargerId: String
    let locationId: String?
    let connectorId: String
    let connectorNumber: Int?
    let connectorType: String?
    let paymentMethod: String
    let idToken: String?
    let idTokenType: String?
    let authMethod: String?
    let idempotencyKey: String
    let currency: String
}

struct StartChargingResponse: Decodable {
    let sessionId: String
    let status: String
    let message: String
    let authorizationStatus: String?
    let remoteStartStatus: String?
}

private struct StopChargingBody: Encodable {
    let reason: String?
    let userInitiated: Bool?
}

private struct HistorySessionResponse: Decodable {
    let sessionId: String
    let station: String
    let startedAt: String
    let endedAt: String?
    let energyKwh: Double
    let costUsd: Double
    let status: String
    let connector: String
    let tariffPerKwh: Double
    let taxesUsd: Double
    let paymentMethod: String

    var asChargingSession: ChargingSession {
        ChargingSession(
            sessionId: sessionId,
            station: station,
            startedAt: startedAt,
            endedAt: endedAt ?? "-",
            energyKwh: energyKwh,
            costUsd: costUsd,
            status: ChargingStatus.fromBackend(status),
            connector: connector,
            tariffPerKwh: tariffPerKwh,
            taxesUsd: taxesUsd,
            paymentMethod: paymentMethod
        )
    }
}

private struct ReceiptResponse: Decodable {
    let sessionId: String
    let station: String
    let connector: String
    let startedAt: String
    let endedAt: String?
    let energyKwh: Double
    let tariffPerKwh: Double
    let taxesUsd: Double
    let totalCost: Double
    let currency: String
    let paymentMethod: String
    let status: String

    var asChargingSession: ChargingSession {
        ChargingSession(
            sessionId: sessionId,
            station: station,
            startedAt: startedAt,
            endedAt: endedAt ?? "-",
            energyKwh: energyKwh,
            costUsd: totalCost,
            status: ChargingStatus.fromBackend(status),
            connector: connector,
            tariffPerKwh: tariffPerKwh,
            taxesUsd: taxesUsd,
            paymentMethod: paymentMethod
        )
    }
}
