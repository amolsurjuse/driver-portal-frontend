import Foundation
import Security

// MARK: - Keychain-based Secure Token Storage

enum KeychainService {

    private static let serviceName = "com.electrahub.driver-portal"

    static func save(key: String, value: String) -> Bool {
        guard let data = value.data(using: .utf8) else { return false }

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: key
        ]

        // Delete any existing item first
        SecItemDelete(query as CFDictionary)

        let attributes: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: key,
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
        ]

        let status = SecItemAdd(attributes as CFDictionary, nil)
        return status == errSecSuccess
    }

    static func load(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        guard status == errSecSuccess, let data = result as? Data else {
            return nil
        }

        return String(data: data, encoding: .utf8)
    }

    static func delete(key: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName,
            kSecAttrAccount as String: key
        ]

        let status = SecItemDelete(query as CFDictionary)
        return status == errSecSuccess || status == errSecItemNotFound
    }

    static func deleteAll() {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: serviceName
        ]
        SecItemDelete(query as CFDictionary)
    }
}

// MARK: - Secure Session Token Vault (Keychain-backed)

final class SecureTokenVault {
    private static let tokenKey = "access_token"
    private static let refreshTokenKey = "refresh_token"

    var accessToken: String? {
        get { KeychainService.load(key: Self.tokenKey) }
        set {
            if let newValue {
                _ = KeychainService.save(key: Self.tokenKey, value: newValue)
            } else {
                _ = KeychainService.delete(key: Self.tokenKey)
            }
        }
    }

    var refreshToken: String? {
        get { KeychainService.load(key: Self.refreshTokenKey) }
        set {
            if let newValue {
                _ = KeychainService.save(key: Self.refreshTokenKey, value: newValue)
            } else {
                _ = KeychainService.delete(key: Self.refreshTokenKey)
            }
        }
    }

    func clearAll() {
        _ = KeychainService.delete(key: Self.tokenKey)
        _ = KeychainService.delete(key: Self.refreshTokenKey)
    }
}
