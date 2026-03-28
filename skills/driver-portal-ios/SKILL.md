---
name: driver-portal-ios
description: Use when working on the SwiftUI Driver Portal iOS app, including API configuration, local validation, and parity checks against the web portal.
---

# Driver Portal iOS

## Repo

- Path: `/Users/amolsurjuse/development/projects/driver-portal-ios`

## Stack

- SwiftUI
- Xcode project: `DriverPortalIOS.xcodeproj`

## Current API Targets

- Auth: `https://dev.electrahub.com:8443/auth`
- Payment: `https://dev.electrahub.com:8443/payment`
- User: `https://dev.electrahub.com:8443/user`

Change them in:

- `DriverPortalIOS/Services/AppServices.swift`

## Notes

- Mirrors current driver portal frontend feature set
- Uses `UserDefaults` and cookie storage for session persistence
- Full packaging may be blocked if the environment lacks simulator runtimes

## Verification

Swift source validation has been done with `swiftc -typecheck` in this workspace when needed.
