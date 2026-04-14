import Foundation
import CoreLocation

// MARK: - GraphQL Response Wrapper

struct GraphQLResponse<T: Decodable>: Decodable {
    let data: T?
    let errors: [GraphQLError]?
}

struct GraphQLError: Decodable {
    let message: String
    let locations: [GraphQLErrorLocation]?
    let path: [String]?
}

struct GraphQLErrorLocation: Decodable {
    let line: Int
    let column: Int
}

// MARK: - OCPI Chargers Query Response

struct OcpiChargersData: Decodable {
    let ocpiChargers: [OcpiCharger]
}

struct OcpiChargerData: Decodable {
    let ocpiCharger: OcpiCharger
}

// MARK: - OCPI Charger

struct OcpiCharger: Decodable, Identifiable {
    let chargerId: String
    let chargerName: String?
    let status: String
    let availablePorts: Int?
    let busyPorts: Int?
    let location: OcpiLocation?
    let pricing: OcpiPricing?
    let currentSession: OcpiCurrentSession?
    let evses: [OcpiEvse]

    var id: String { chargerId }
}

struct OcpiLocation: Decodable {
    let ocpiLocationId: String?
    let name: String?
    let coordinates: OcpiCoordinates
}

struct OcpiCoordinates: Decodable {
    let latitude: Double?
    let longitude: Double?
}

struct OcpiPricing: Decodable {
    let tariffIds: [String]?
    let tariffs: [OcpiTariff]?
}

struct OcpiTariff: Decodable, Identifiable {
    var id: String { tariffId }

    let tariffId: String
    let name: String?
    let description: String?
    let currency: String?
    let energyPrice: Double?
    let timePrice: Double?
    let parkingPrice: Double?
    let flatFee: Double?
}

struct OcpiCurrentSession: Decodable {
    let id: String
    let userId: String?
    let status: String?
    let startedAt: String?
}

// MARK: - EVSE & Connector

struct OcpiEvse: Decodable {
    let uid: String
    let status: String
    let connectors: [OcpiConnector]
}

struct OcpiConnector: Decodable, Identifiable {
    let id: String
    let status: String
    let available: Bool?
    let standard: String
    let format: String?
    let powerType: String?
    let tariffIds: [String]?
    let tariffs: [OcpiTariff]?
}

// MARK: - Mapping to StationLocation

extension OcpiCharger {

    /// Converts an OCPI charger from the GraphQL API into the app's `StationLocation` model
    /// so the existing map UI can display it without changes.
    /// Returns `nil` when the charger has no valid coordinates.
    func toStationLocation() -> StationLocation? {
        guard let location,
              let lat = location.coordinates.latitude,
              let lng = location.coordinates.longitude else {
            return nil
        }

        let pricingByTariffId = Dictionary(
            uniqueKeysWithValues: (pricing?.tariffs ?? []).map { ($0.tariffId, $0) }
        )

        let connectorSummaries = evses.flatMap { evse in
            evse.connectors.map { connector in
                let connectorTariff = connector.tariffs?.first
                    ?? connector.tariffIds?.compactMap { pricingByTariffId[$0] }.first
                let perKwhPrice = connectorTariff?.energyPrice ?? 0.0

                ConnectorSummary(
                    id: connector.id,
                    type: Self.mapConnectorStandard(connector.standard),
                    power: Self.estimatePower(standard: connector.standard, powerType: connector.powerType),
                    status: Self.mapConnectorStatus(connector.status, available: connector.available),
                    tariffPerKwh: perKwhPrice
                )
            }
        }

        return StationLocation(
            id: chargerId,
            name: chargerName ?? chargerId,
            address: location.name ?? "Charging Station",
            city: "",
            state: "",
            postalCode: "",
            latitude: lat,
            longitude: lng,
            connectors: connectorSummaries,
            status: Self.mapStationStatus(status, connectors: connectorSummaries),
            operatingHours: nil,
            imageURL: nil
        )
    }

    // MARK: - Private Mapping Helpers

    private static func mapConnectorStandard(_ standard: String) -> ConnectorType {
        switch standard.uppercased() {
        case "IEC_62196_T1_COMBO", "CCS", "CCS2", "CCS1":
            return .ccs2
        case "CHADEMO":
            return .chademo
        case "IEC_62196_T2", "TYPE_2":
            return .type2
        case "IEC_62196_T1", "TYPE_1":
            return .type1
        default:
            return .ccs2 // Sensible default for unknown DC standards
        }
    }

    private static func mapConnectorStatus(_ status: String, available: Bool?) -> ConnectorStatus {
        if let available, available { return .available }

        switch status.uppercased() {
        case "AVAILABLE":
            return .available
        case "CHARGING", "OCCUPIED", "PREPARING", "SUSPENDEDEV", "SUSPENDEDEVSE", "FINISHING":
            return .charging
        case "FAULTED", "INOPERATIVE":
            return .faulted
        case "OFFLINE", "OUTOFORDER":
            return .offline
        case "RESERVED", "BLOCKED", "UNAVAILABLE":
            return .reserved
        default:
            return .offline
        }
    }

    private static func mapStationStatus(_ status: String, connectors: [ConnectorSummary]) -> StationStatus {
        if connectors.contains(where: { $0.status == .available }) {
            return .available
        }
        if connectors.contains(where: { $0.status == .charging || $0.status == .reserved }) {
            return .occupied
        }
        if connectors.contains(where: { $0.status == .faulted }) {
            return .faulted
        }

        switch status.uppercased() {
        case "AVAILABLE":
            return .available
        case "CHARGING", "OCCUPIED", "PREPARING", "FINISHING":
            return .occupied
        case "FAULTED", "INOPERATIVE":
            return .faulted
        default:
            return .offline
        }
    }

    /// Estimates charger power in kW based on OCPI connector standard and power type.
    private static func estimatePower(standard: String, powerType: String?) -> Int {
        let std = standard.uppercased()
        let pwr = (powerType ?? "").uppercased()

        if std.contains("COMBO") || std == "CCS" || std == "CCS2" || std == "CCS1" {
            return pwr.contains("AC") ? 22 : 150
        }
        if std == "CHADEMO" {
            return 50
        }
        if std.contains("T2") || std == "TYPE_2" {
            return pwr.contains("DC") ? 50 : 22
        }
        if std.contains("T1") || std == "TYPE_1" {
            return 7
        }
        return 50
    }
}
