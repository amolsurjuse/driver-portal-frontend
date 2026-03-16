# Driver Portal iOS

SwiftUI iPhone/iPad app that mirrors the current `driver-portal-frontend` feature set:

- Authentication with the same auth endpoints and JWT-based session parsing
- Dashboard with wallet-backed summary metrics and a 12-month charging trend
- Payments for wallet top-ups, saved cards, auto top-up, and refresh/reload
- Charging history with receipt detail and PDF export
- Profile lookup/edit with the same user-service fallback by email

## Project layout

- `DriverPortalIOS.xcodeproj`: Xcode project wrapper
- `DriverPortalIOS/`: SwiftUI source tree

## API configuration

The app is currently pointed at the same development services used by the Angular portal:

- Auth: `https://dev.electrahub.com:8443/auth`
- Payment: `https://dev.electrahub.com:8443/payment`
- User: `https://dev.electrahub.com:8443/user`

You can change those values in [`AppServices.swift`](/Users/amolsurjuse/development/projects/driver-portal-ios/DriverPortalIOS/Services/AppServices.swift).

## Notes

- Charging history uses the same sample session data that exists in the web app because the current portal does not call a history API.
- Session persistence uses `UserDefaults` for the access token and shared cookie storage for refresh/logout flows.
- Receipt export writes a temporary PDF file and presents the native iOS share sheet.
- Swift source validation passes with `swiftc -typecheck` against the iPhoneOS 18.5 SDK.
- Full `xcodebuild` app packaging is still blocked in this environment because `actool` cannot access any CoreSimulator runtimes while compiling the asset catalog.
