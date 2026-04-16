import SwiftUI

@MainActor
private final class ProfileViewModel: ObservableObject {
    @Published private(set) var profile: UserProfileResponse?
    @Published var firstName = ""
    @Published var lastName = ""
    @Published var street = ""
    @Published var city = ""
    @Published var state = ""
    @Published var postalCode = ""
    @Published var countryCode = ""
    @Published var isLoading = true
    @Published var isSaving = false
    @Published var isEditing = false
    @Published var isDeletingAccount = false
    @Published var errorMessage: String?
    @Published var saveMessage: String?

    private let userService: UserService
    private var loadedIdentity: String?

    init(userService: UserService) {
        self.userService = userService
    }

    func loadIfNeeded(session: SessionStore) async {
        let identity = "\(session.userId ?? "")::\(session.email ?? "")"
        guard loadedIdentity != identity else { return }
        await load(session: session)
    }

    func load(session: SessionStore) async {
        isLoading = true
        defer { isLoading = false }

        do {
            let resolved = try await userService.resolveProfile(userId: session.userId, email: session.email)
            profile = resolved
            loadedIdentity = "\(session.userId ?? "")::\(session.email ?? "")"
            errorMessage = nil
            saveMessage = nil
            apply(resolved)
        } catch {
            profile = nil
            errorMessage = error.localizedDescription
        }
    }

    func startEditing() {
        guard profile != nil, !isSaving else { return }
        errorMessage = nil
        saveMessage = nil
        isEditing = true
    }

    func reset() {
        guard let profile else { return }
        apply(profile)
        errorMessage = nil
        saveMessage = nil
        isEditing = false
    }

    func save() async {
        guard let profile else {
            errorMessage = "Unable to save profile details."
            return
        }

        let payload = UpdateUserProfileRequest(
            firstName: firstName.trimmingCharacters(in: .whitespacesAndNewlines),
            lastName: lastName.trimmingCharacters(in: .whitespacesAndNewlines),
            address: AddressDTO(
                street: street.trimmingCharacters(in: .whitespacesAndNewlines),
                city: city.trimmingCharacters(in: .whitespacesAndNewlines),
                state: state.trimmingCharacters(in: .whitespacesAndNewlines),
                postalCode: postalCode.trimmingCharacters(in: .whitespacesAndNewlines),
                countryIsoCode: countryCode.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
            )
        )

        guard formIsValid else {
            errorMessage = "Complete all profile fields before saving."
            return
        }

        isSaving = true
        defer { isSaving = false }

        do {
            let updated = try await userService.updateProfile(userId: profile.userId, payload: payload)
            self.profile = updated
            apply(updated)
            isEditing = false
            errorMessage = nil
            saveMessage = "Profile updated successfully."
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func requestAccountDeletion(confirmDirectDeletion: Bool) async -> AccountDeletionResponse? {
        guard let profile else {
            errorMessage = "Unable to delete account right now."
            return nil
        }

        isDeletingAccount = true
        defer { isDeletingAccount = false }

        do {
            let response = try await userService.requestAccountDeletion(
                userId: profile.userId,
                confirmDirectDeletion: confirmDirectDeletion
            )
            errorMessage = nil
            saveMessage = nil
            return response
        } catch {
            errorMessage = error.localizedDescription
            return nil
        }
    }

    var formIsValid: Bool {
        !firstName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !lastName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !street.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !city.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !state.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !postalCode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !countryCode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    func displayName(email: String?) -> String {
        let source = (email ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        guard !source.isEmpty else { return "Driver" }
        let local = source.split(separator: "@").first.map(String.init) ?? source
        let words = local
            .replacingOccurrences(of: ".", with: " ")
            .replacingOccurrences(of: "_", with: " ")
            .replacingOccurrences(of: "-", with: " ")
            .split(separator: " ")
            .map(String.init)
        guard !words.isEmpty else { return "Driver" }
        return words
            .map { String($0.prefix(1)).uppercased() + String($0.dropFirst()) }
            .joined(separator: " ")
    }

    func initials(email: String?) -> String {
        let words = displayName(email: email).split(separator: " ")
        if words.count >= 2 {
            return "\(words[0].prefix(1))\(words[1].prefix(1))".uppercased()
        }
        return String(displayName(email: email).prefix(2)).uppercased()
    }

    func fullName(email: String?) -> String {
        let merged = "\(profile?.firstName ?? "") \(profile?.lastName ?? "")"
            .trimmingCharacters(in: .whitespacesAndNewlines)
        return merged.isEmpty ? displayName(email: email) : merged
    }

    private func apply(_ profile: UserProfileResponse) {
        firstName = profile.firstName ?? ""
        lastName = profile.lastName ?? ""
        street = profile.street ?? ""
        city = profile.city ?? ""
        state = profile.state ?? ""
        postalCode = profile.postalCode ?? ""
        countryCode = profile.countryCode ?? ""
    }
}

struct ProfileView: View {
    @EnvironmentObject private var sessionStore: SessionStore

    @StateObject private var model: ProfileViewModel
    @State private var confirmLogoutDevice = false
    @State private var confirmLogoutAll = false
    @State private var confirmDeleteAccount = false
    @State private var showConfirmDirectDeletion = false
    @State private var deletionAlertTitle = "Account deletion"
    @State private var deletionAlertMessage = ""
    @State private var showDeletionAlert = false
    @State private var logoutAfterDeletionAlert = false

    init(userService: UserService) {
        _model = StateObject(wrappedValue: ProfileViewModel(userService: userService))
    }

    var body: some View {
        ZStack {
            SpaceBackground()

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text("User Profile")
                        .font(.system(size: 34, weight: .bold, design: .rounded))
                        .foregroundStyle(ChargingTheme.brightText)

                    if model.isLoading {
                        ProgressView("Loading profile...")
                            .tint(ChargingTheme.neonCyan)
                            .foregroundStyle(ChargingTheme.dimText)
                            .frame(maxWidth: .infinity, alignment: .center)
                    } else if let profile = model.profile {
                        PortalCard {
                            VStack(alignment: .leading, spacing: 18) {
                                HStack(spacing: 16) {
                                    ZStack {
                                        Circle()
                                            .fill(
                                                LinearGradient(
                                                    colors: [ChargingTheme.neonCyan.opacity(0.2), ChargingTheme.neonBlue.opacity(0.15)],
                                                    startPoint: .topLeading,
                                                    endPoint: .bottomTrailing
                                                )
                                            )
                                            .frame(width: 68, height: 68)
                                        Text(model.initials(email: profile.email))
                                            .font(.title3.weight(.bold))
                                            .foregroundStyle(ChargingTheme.neonCyan)
                                    }

                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(model.fullName(email: profile.email))
                                            .font(.title2.weight(.bold))
                                            .foregroundStyle(ChargingTheme.brightText)
                                        Text(profile.email)
                                            .foregroundStyle(ChargingTheme.dimText)
                                    }

                                    Spacer()

                                    if !model.isEditing {
                                        Button("Edit") {
                                            model.startEditing()
                                        }
                                        .buttonStyle(.bordered)
                                        .tint(ChargingTheme.neonCyan)
                                    }
                                }

                                if let error = model.errorMessage {
                                    Text(error)
                                        .font(.footnote)
                                        .foregroundStyle(.red)
                                }

                                if let saveMessage = model.saveMessage {
                                    Text(saveMessage)
                                        .font(.footnote.weight(.semibold))
                                        .foregroundStyle(ChargingTheme.neonGreen)
                                }

                                VStack(alignment: .leading, spacing: 16) {
                                    profileField(title: "First name", text: $model.firstName, editable: model.isEditing)
                                    profileField(title: "Last name", text: $model.lastName, editable: model.isEditing)
                                    readonlyField(title: "Email", value: profile.email)
                                    readonlyField(title: "Phone", value: profile.phoneNumber ?? "Not set")
                                    readonlyField(
                                        title: "Status",
                                        value: profile.pendingDeletion == true ? "Pending deletion" : (profile.enabled ? "Active" : "Disabled")
                                    )
                                    readonlyField(title: "Member since", value: PortalFormatters.memberTime(profile.createdAt))
                                }

                                Divider().overlay(ChargingTheme.dimText.opacity(0.15))

                                VStack(alignment: .leading, spacing: 16) {
                                    Text("Address")
                                        .font(.headline)
                                        .foregroundStyle(ChargingTheme.brightText)
                                    profileField(title: "Street", text: $model.street, editable: model.isEditing)
                                    profileField(title: "City", text: $model.city, editable: model.isEditing)
                                    profileField(title: "State", text: $model.state, editable: model.isEditing)
                                    profileField(title: "Postal code", text: $model.postalCode, editable: model.isEditing)
                                    profileField(title: "Country code", text: $model.countryCode, editable: model.isEditing)
                                }

                                if model.isEditing {
                                    HStack {
                                        Button("Cancel") {
                                            model.reset()
                                        }
                                        .buttonStyle(.bordered)

                                        Button {
                                            Task { await model.save() }
                                        } label: {
                                            if model.isSaving {
                                                ProgressView()
                                                    .tint(.white)
                                            } else {
                                                Text("Save changes")
                                            }
                                        }
                                        .buttonStyle(.borderedProminent)
                                        .tint(ChargingTheme.neonCyan)
                                        .disabled(!model.formIsValid || model.isSaving)
                                    }
                                }
                            }
                        }

                        PortalCard {
                            VStack(alignment: .leading, spacing: 16) {
                                Text("Account actions")
                                    .font(.title3.weight(.bold))
                                    .foregroundStyle(ChargingTheme.brightText)
                                Text("Use the same session controls exposed in the web portal.")
                                    .foregroundStyle(ChargingTheme.dimText)

                                Button("Log out on this device", role: .destructive) {
                                    confirmLogoutDevice = true
                                }
                                .buttonStyle(.bordered)

                                Button("Log out on all devices", role: .destructive) {
                                    confirmLogoutAll = true
                                }
                                .buttonStyle(.bordered)

                                Button("Delete account", role: .destructive) {
                                    confirmDeleteAccount = true
                                }
                                .buttonStyle(.bordered)
                                .disabled(model.isDeletingAccount)

                                if model.isDeletingAccount {
                                    ProgressView("Submitting account deletion request...")
                                        .tint(ChargingTheme.neonCyan)
                                        .foregroundStyle(ChargingTheme.dimText)
                                }
                            }
                        }
                    } else {
                        PortalCard {
                            Text(model.errorMessage ?? "Profile details are unavailable right now.")
                                .foregroundStyle(ChargingTheme.dimText)
                        }
                    }
                }
                .padding(20)
            }
        }
        .navigationTitle("Profile")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await model.loadIfNeeded(session: sessionStore)
        }
        .alert("Log out on this device?", isPresented: $confirmLogoutDevice) {
            Button("Cancel", role: .cancel) {}
            Button("Log out", role: .destructive) {
                Task { await sessionStore.logoutDevice() }
            }
        }
        .alert("Log out on all devices?", isPresented: $confirmLogoutAll) {
            Button("Cancel", role: .cancel) {}
            Button("Log out everywhere", role: .destructive) {
                Task { await sessionStore.logoutAll() }
            }
        }
        .alert("Delete your account?", isPresented: $confirmDeleteAccount) {
            Button("Cancel", role: .cancel) {}
            Button("Continue", role: .destructive) {
                Task {
                    await requestAccountDeletion(confirmDirectDeletion: false)
                }
            }
        } message: {
            Text("This request may permanently delete your account or mark it for pending deletion based on your wallet and active charging status.")
        }
        .alert("Confirm permanent deletion", isPresented: $showConfirmDirectDeletion) {
            Button("Cancel", role: .cancel) {}
            Button("Delete account", role: .destructive) {
                Task {
                    await requestAccountDeletion(confirmDirectDeletion: true)
                }
            }
        } message: {
            Text("Your wallet is empty and no active charging session was found. Deleting now is permanent.")
        }
        .alert(deletionAlertTitle, isPresented: $showDeletionAlert) {
            Button("OK") {
                if logoutAfterDeletionAlert {
                    sessionStore.clearSession()
                }
            }
        } message: {
            Text(deletionAlertMessage)
        }
    }

    @MainActor
    private func requestAccountDeletion(confirmDirectDeletion: Bool) async {
        guard let response = await model.requestAccountDeletion(confirmDirectDeletion: confirmDirectDeletion) else {
            return
        }

        switch response.decision {
        case .activeSessionInProgress:
            logoutAfterDeletionAlert = false
            deletionAlertTitle = "Finish active charging"
            deletionAlertMessage = response.message
            showDeletionAlert = true
        case .confirmDirectDeletion:
            showConfirmDirectDeletion = true
        case .accountMarkedPendingDeletion:
            logoutAfterDeletionAlert = true
            deletionAlertTitle = "Deletion request submitted"
            deletionAlertMessage = response.message
            showDeletionAlert = true
        case .accountDeleted:
            logoutAfterDeletionAlert = true
            deletionAlertTitle = "Account deleted"
            deletionAlertMessage = response.message
            showDeletionAlert = true
        case .alreadyPendingDeletion:
            logoutAfterDeletionAlert = true
            deletionAlertTitle = "Pending deletion"
            deletionAlertMessage = response.message
            showDeletionAlert = true
        }
    }

    @ViewBuilder
    private func profileField(title: String, text: Binding<String>, editable: Bool) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(ChargingTheme.dimText)
            if editable {
                TextField(title, text: text)
                    .padding()
                    .background(Color.white.opacity(0.5))
                    .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            } else {
                Text(text.wrappedValue.isEmpty ? "Not set" : text.wrappedValue)
                    .foregroundStyle(ChargingTheme.brightText)
            }
        }
    }

    @ViewBuilder
    private func readonlyField(title: String, value: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(ChargingTheme.dimText)
            Text(value)
                .foregroundStyle(ChargingTheme.brightText)
        }
    }
}
