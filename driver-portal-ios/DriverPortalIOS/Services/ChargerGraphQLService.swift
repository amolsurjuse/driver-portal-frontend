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
            availablePorts
            busyPorts
            location {
              ocpiLocationId
              name
              coordinates { latitude longitude }
            }
            pricing {
              tariffIds
              tariffs {
                tariffId
                name
                currency
                energyPrice
                timePrice
                parkingPrice
                flatFee
              }
            }
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
                tariffs {
                  tariffId
                  name
                  currency
                  energyPrice
                  timePrice
                  parkingPrice
                  flatFee
                }
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

    /// Fetches a single charger by ID with full connector and tariff details.
    func getChargerDetail(chargerId: String) async throws -> OcpiCharger {
        let query = """
        query {
          ocpiCharger(chargerId: "\(chargerId)") {
            chargerId
            chargerName
            status
            availablePorts
            busyPorts
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
            pricing {
              tariffIds
              tariffs {
                tariffId
                name
                currency
                energyPrice
                timePrice
                parkingPrice
                flatFee
              }
            }
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
                tariffs {
                  tariffId
                  name
                  currency
                  energyPrice
                  timePrice
                  parkingPrice
                  flatFee
                }
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
