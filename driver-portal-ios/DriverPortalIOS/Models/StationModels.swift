import Foundation
import CoreLocation

// MARK: - Station & Connector Models

struct StationLocation: Codable, Hashable, Identifiable {
    let id: String
    let name: String
    let address: String
    let city: String
    let state: String
    let postalCode: String
    let latitude: Double
    let longitude: Double
    let connectors: [ConnectorSummary]
    let status: StationStatus
    let operatingHours: String?
    let imageURL: String?

    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }

    var availableConnectors: Int {
        connectors.filter { $0.status == .available }.count
    }

    var totalConnectors: Int {
        connectors.count
    }

    var busyConnectors: Int {
        max(totalConnectors - availableConnectors, 0)
    }

    var statusColor: String {
        switch status {
        case .available: return "green"
        case .occupied: return "orange"
        case .offline: return "gray"
        case .faulted: return "red"
        }
    }

    static let samples: [StationLocation] = [
        StationLocation(
            id: "station-001",
            name: "Electra Hub - SF Downtown",
            address: "200 Market St",
            city: "San Francisco",
            state: "CA",
            postalCode: "94105",
            latitude: 37.7935,
            longitude: -122.3968,
            connectors: [
                ConnectorSummary(id: "conn-1", type: .ccs2, power: 150, status: .available, tariffPerKwh: 0.36),
                ConnectorSummary(id: "conn-2", type: .ccs2, power: 150, status: .charging, tariffPerKwh: 0.36),
                ConnectorSummary(id: "conn-3", type: .type2, power: 22, status: .available, tariffPerKwh: 0.28)
            ],
            status: .available,
            operatingHours: "24/7",
            imageURL: nil
        ),
        StationLocation(
            id: "station-002",
            name: "Electra Hub - Palo Alto",
            address: "450 University Ave",
            city: "Palo Alto",
            state: "CA",
            postalCode: "94301",
            latitude: 37.4440,
            longitude: -122.1600,
            connectors: [
                ConnectorSummary(id: "conn-4", type: .ccs2, power: 350, status: .available, tariffPerKwh: 0.42),
                ConnectorSummary(id: "conn-5", type: .chademo, power: 50, status: .available, tariffPerKwh: 0.34)
            ],
            status: .available,
            operatingHours: "6:00 AM - 11:00 PM",
            imageURL: nil
        ),
        StationLocation(
            id: "station-003",
            name: "Electra Hub - San Jose North",
            address: "1200 Coleman Ave",
            city: "San Jose",
            state: "CA",
            postalCode: "95110",
            latitude: 37.3690,
            longitude: -121.9220,
            connectors: [
                ConnectorSummary(id: "conn-6", type: .ccs2, power: 150, status: .charging, tariffPerKwh: 0.35),
                ConnectorSummary(id: "conn-7", type: .ccs2, power: 150, status: .charging, tariffPerKwh: 0.35),
                ConnectorSummary(id: "conn-8", type: .type2, power: 22, status: .faulted, tariffPerKwh: 0.28)
            ],
            status: .occupied,
            operatingHours: "24/7",
            imageURL: nil
        ),
        StationLocation(
            id: "station-004",
            name: "Electra Hub - Oakland Harbor",
            address: "55 Harrison St",
            city: "Oakland",
            state: "CA",
            postalCode: "94607",
            latitude: 37.7955,
            longitude: -122.2752,
            connectors: [
                ConnectorSummary(id: "conn-9", type: .ccs2, power: 150, status: .available, tariffPerKwh: 0.33),
                ConnectorSummary(id: "conn-10", type: .type2, power: 22, status: .available, tariffPerKwh: 0.26)
            ],
            status: .available,
            operatingHours: "5:00 AM - 12:00 AM",
            imageURL: nil
        )
    ]
}

struct ConnectorSummary: Codable, Hashable, Identifiable {
    let id: String
    let type: ConnectorType
    let power: Int
    let status: ConnectorStatus
    let tariffPerKwh: Double

    var powerLabel: String {
        "\(power) kW"
    }

    var typeLabel: String {
        switch type {
        case .ccs2: return "CCS-2"
        case .chademo: return "CHAdeMO"
        case .type2: return "Type 2"
        case .type1: return "Type 1"
        }
    }
}

enum ConnectorType: String, Codable, Hashable {
    case ccs2 = "CCS2"
    case chademo = "CHADEMO"
    case type2 = "TYPE2"
    case type1 = "TYPE1"
}

enum ConnectorStatus: String, Codable, Hashable {
    case available = "AVAILABLE"
    case charging = "CHARGING"
    case faulted = "FAULTED"
    case offline = "OFFLINE"
    case reserved = "RESERVED"
}

enum StationStatus: String, Codable, Hashable {
    case available = "AVAILABLE"
    case occupied = "OCCUPIED"
    case offline = "OFFLINE"
    case faulted = "FAULTED"
}

// MARK: - Live Charging Session

struct LiveChargingSession: Codable, Identifiable {
    let id: String
    let stationId: String
    let stationName: String
    let connectorId: String
    let connectorType: String
    let startedAt: String
    let energyDeliveredKwh: Double
    let currentPowerKw: Double
    let estimatedCost: Double
    let batteryPercent: Int?
    let estimatedTimeRemainingMin: Int?
    let status: LiveSessionStatus

    var isActive: Bool {
        status == .charging || status == .preparing
    }

    static let sample = LiveChargingSession(
        id: "live-sess-001",
        stationId: "station-003",
        stationName: "Electra Hub - San Jose North",
        connectorId: "conn-6",
        connectorType: "CCS-2",
        startedAt: "2026-03-20T09:12:00Z",
        energyDeliveredKwh: 14.8,
        currentPowerKw: 142.5,
        estimatedCost: 5.18,
        batteryPercent: 62,
        estimatedTimeRemainingMin: 18,
        status: .charging
    )
}

enum LiveSessionStatus: String, Codable, Hashable {
    case preparing = "PREPARING"
    case charging = "CHARGING"
    case suspended = "SUSPENDED"
    case finishing = "FINISHING"
    case completed = "COMPLETED"
}

// MARK: - Favorite Station

struct FavoriteStation: Codable, Hashable, Identifiable {
    let id: String
    let stationId: String
    let stationName: String
    let addedAt: String
}

// MARK: - Notification

struct DriverNotification: Identifiable, Hashable {
    let id: String
    let title: String
    let body: String
    let timestamp: String
    let type: NotificationType
    let isRead: Bool

    enum NotificationType: String, Hashable {
        case chargingComplete = "CHARGING_COMPLETE"
        case lowBalance = "LOW_BALANCE"
        case stationAvailable = "STATION_AVAILABLE"
        case promo = "PROMO"
        case system = "SYSTEM"
    }

    static let samples: [DriverNotification] = [
        DriverNotification(
            id: "notif-1",
            title: "Charging Complete",
            body: "Your session at SF Downtown finished. 21.4 kWh delivered, total $9.12.",
            timestamp: "2026-03-20 08:32",
            type: .chargingComplete,
            isRead: false
        ),
        DriverNotification(
            id: "notif-2",
            title: "Low Wallet Balance",
            body: "Your wallet balance is below $30. Consider adding funds to avoid interruptions.",
            timestamp: "2026-03-19 14:05",
            type: .lowBalance,
            isRead: true
        ),
        DriverNotification(
            id: "notif-3",
            title: "Station Now Available",
            body: "Electra Hub - Palo Alto now has 2 available CCS-2 connectors.",
            timestamp: "2026-03-19 10:22",
            type: .stationAvailable,
            isRead: true
        )
    ]
}

// MARK: - CO2 / Environmental Impact

struct EnvironmentalImpact {
    let totalEnergyKwh: Double
    let co2SavedKg: Double
    let treesEquivalent: Double
    let gasolineSavedLiters: Double

    static func calculate(totalEnergyKwh: Double) -> EnvironmentalImpact {
        // Average ICE car: ~0.21 kg CO2 per km, EV: ~0.05 kg CO2 per km
        // Average EV efficiency: ~6 km per kWh
        let kmDriven = totalEnergyKwh * 6.0
        let co2Saved = kmDriven * 0.16 // difference per km in kg
        let treesEquivalent = co2Saved / 22.0 // ~22 kg CO2 absorbed per tree per year
        let gasolineSaved = kmDriven / 12.0 // ~12 km per liter for avg ICE

        return EnvironmentalImpact(
            totalEnergyKwh: totalEnergyKwh,
            co2SavedKg: co2Saved,
            treesEquivalent: treesEquivalent,
            gasolineSavedLiters: gasolineSaved
        )
    }
}
