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
        return try await client.request(request)
    }

    func stopSession(sessionId: String) async throws {
        let request = try client.makeRequest(
            baseURL: configuration.sessionBaseURL,
            path: "api/v1/sessions/\(sessionId)/stop",
            method: .post,
            body: EmptyStopBody()
        )
        try await client.request(request)
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

private struct EmptyStopBody: Encodable {}
