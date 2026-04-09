import Foundation

// MARK: - Charger GraphQL Service

/// Fetches OCPI charger data from the charger GraphQL endpoint.
/// Endpoint: https://dev.electrahub.com:8443/charger/graphql
final class ChargerGraphQLService {
    private let client: APIClient
    private let configuration: AppConfiguration

    init(client: APIClient, configuration: AppConfiguration) {
        self.client = client
        self.configuration = configuration
    }

    /// Fetches OCPI chargers for a given country with pagination.
    /// - Parameters:
    ///   - countryCode: ISO country code (default "US")
    ///   - limit: Maximum number of chargers to fetch (default 20)
    ///   - offset: Pagination offset (default 0)
    /// - Returns: Array of `OcpiCharger` from the GraphQL API
    func getOcpiChargers(countryCode: String = "US", limit: Int = 20, offset: Int = 0) async throws -> [OcpiCharger] {
        let query = """
        query {
          ocpiChargers(countryCode: "\(countryCode)", limit: \(limit), offset: \(offset)) {
            chargerId
            chargerName
            status
            location {
              ocpiLocationId
              name
              coordinates { latitude longitude }
            }
            pricing { tariffIds }
            evses {
              uid
              status
              connectors {
                id
                status
                available
                standard
                format
                powerType
                tariffIds
              }
            }
          }
        }
        """

        let body = GraphQLRequestBody(query: query)
        let request = try client.makeRequest(
            baseURL: configuration.chargerBaseURL,
            path: "graphql",
            method: .post,
            body: body
        )

        let response: GraphQLResponse<OcpiChargersData> = try await client.request(request)

        if let errors = response.errors, !errors.isEmpty {
            let message = errors.map(\.message).joined(separator: "; ")
            throw APIError(statusCode: 0, message: "GraphQL error: \(message)")
        }

        guard let data = response.data else {
            throw APIError(statusCode: 0, message: "No data returned from charger GraphQL API.")
        }

        return data.ocpiChargers
    }

    /// Convenience method that fetches OCPI chargers and converts them to `StationLocation`
    /// so the map view can display them directly.
    func getChargerStations(countryCode: String = "US", limit: Int = 20, offset: Int = 0) async throws -> [StationLocation] {
        let chargers = try await getOcpiChargers(countryCode: countryCode, limit: limit, offset: offset)
        return chargers.compactMap { $0.toStationLocation() }
    }

    /// Fetches a single charger detail projection by charger ID, connector ID, or both.
    /// At least one identifier must be provided.
    func getChargerDetail(chargerId: String? = nil, connectorId: String? = nil) async throws -> OcpiCharger {
        let normalizedChargerId = chargerId?.trimmingCharacters(in: .whitespacesAndNewlines)
        let normalizedConnectorId = connectorId?.trimmingCharacters(in: .whitespacesAndNewlines)

        let hasChargerId = !(normalizedChargerId?.isEmpty ?? true)
        let hasConnectorId = !(normalizedConnectorId?.isEmpty ?? true)
        guard hasChargerId || hasConnectorId else {
            throw APIError(statusCode: 0, message: "Either chargerId or connectorId is required.")
        }

        var arguments: [String] = []
        if let normalizedChargerId, !normalizedChargerId.isEmpty {
            arguments.append("chargerId: \"\(normalizedChargerId)\"")
        }
        if let normalizedConnectorId, !normalizedConnectorId.isEmpty {
            arguments.append("connectorId: \"\(normalizedConnectorId)\"")
        }

        let query = """
        query {
          ocpiCharger(\(arguments.joined(separator: ", "))) {
            chargerId
            chargerName
            status
            currentSession {
              id
              userId
              status
              startedAt
            }
            location {
              ocpiLocationId
              name
              coordinates { latitude longitude }
            }
            pricing { tariffIds }
            evses {
              uid
              status
              connectors {
                id
                status
                available
                standard
                format
                powerType
                tariffIds
              }
            }
          }
        }
        """

        let body = GraphQLRequestBody(query: query)
        let request = try client.makeRequest(
            baseURL: configuration.chargerBaseURL,
            path: "graphql",
            method: .post,
            body: body
        )

        let response: GraphQLResponse<OcpiChargerData> = try await client.request(request)

        if let errors = response.errors, !errors.isEmpty {
            let message = errors.map(\.message).joined(separator: "; ")
            throw APIError(statusCode: 0, message: "GraphQL error: \(message)")
        }

        guard let data = response.data?.ocpiCharger else {
            throw APIError(statusCode: 0, message: "Charger not found.")
        }

        return data
    }
}

// MARK: - GraphQL Request Body

private struct GraphQLRequestBody: Encodable {
    let query: String
    let variables: [String: String]? = nil
}
