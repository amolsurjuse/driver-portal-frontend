import SwiftUI

private enum AuthScreen: String, CaseIterable, Identifiable {
    case login = "Sign In"
    case register = "Register"

    var id: String { rawValue }
}

// MARK: - Auth Flow View

struct AuthFlowView: View {
    let services: AppServices

    @State private var screen: AuthScreen = .login
    @State private var logoAppeared = false

    var body: some View {
        NavigationStack {
            ZStack {
                // Mesh gradient background
                SpaceBackground()

                ScrollView {
                    VStack(alignment: .leading, spacing: 28) {
                        // Logo + Branding header
                        VStack(alignment: .leading, spacing: 16) {
                            ElectraHubLogoFull(height: 56)
                                .scaleEffect(logoAppeared ? 1.0 : 0.5)
                                .opacity(logoAppeared ? 1.0 : 0)

                            Text("Manage charging sessions, wallet, payments, and your profile — all in one place.")
                                .font(.subheadline)
                                .foregroundStyle(ChargingTheme.dimText)
                                .fixedSize(horizontal: false, vertical: true)
                        }
                        .padding(.top, 8)

                        // Segmented picker
                        Picker("Authentication", selection: $screen) {
                            ForEach(AuthScreen.allCases) { item in
                                Text(item.rawValue).tag(item)
                            }
                        }
                        .pickerStyle(.segmented)

                        // Auth form card
                        PortalCard {
                            switch screen {
                            case .login:
                                LoginView()
                            case .register:
                                RegisterView(authService: services.authService)
                            }
                        }

                        // Footer
                        Text("By signing in, you agree to Electra Hub's Terms of Service and Privacy Policy.")
                            .font(.caption2)
                            .foregroundStyle(ChargingTheme.dimText.opacity(0.6))
                            .multilineTextAlignment(.center)
                            .frame(maxWidth: .infinity)
                    }
                    .padding(20)
                }
            }
            .navigationBarHidden(true)
            .onAppear {
                withAnimation(.spring(duration: 0.6, bounce: 0.3)) {
                    logoAppeared = true
                }
            }
        }
    }
}

private struct LoginView: View {
    @EnvironmentObject private var sessionStore: SessionStore

    @State private var email = ""
    @State private var password = ""

    private var formIsValid: Bool {
        email.contains("@") && password.count >= 6
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Welcome back")
                .font(.title2.weight(.bold))
                .foregroundStyle(ChargingTheme.brightText)

            TextField("Email", text: $email)
                .textInputAutocapitalization(.never)
                .keyboardType(.emailAddress)
                .autocorrectionDisabled()
                .padding()
                .background(Color.white.opacity(0.5))
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

            SecureField("Password", text: $password)
                .textInputAutocapitalization(.never)
                .padding()
                .background(Color.white.opacity(0.5))
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

            if let authError = sessionStore.authError {
                Text(authError)
                    .font(.footnote)
                    .foregroundStyle(.red)
            }

            Button {
                Task {
                    _ = await sessionStore.login(
                        email: email.trimmingCharacters(in: .whitespacesAndNewlines),
                        password: password
                    )
                }
            } label: {
                HStack {
                    if sessionStore.isBusy {
                        ProgressView()
                            .tint(.white)
                    }
                    Text(sessionStore.isBusy ? "Signing in..." : "Sign in")
                        .fontWeight(.semibold)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(formIsValid
                              ? LinearGradient(colors: [ChargingTheme.neonCyan, ChargingTheme.neonBlue], startPoint: .leading, endPoint: .trailing)
                              : LinearGradient(colors: [Color.gray.opacity(0.3), Color.gray.opacity(0.2)], startPoint: .leading, endPoint: .trailing)
                        )
                )
                .foregroundStyle(.white)
            }
            .disabled(!formIsValid || sessionStore.isBusy)
        }
    }
}

private struct RegisterView: View {
    @EnvironmentObject private var sessionStore: SessionStore

    let authService: AuthService

    @State private var countries: [CountryOption] = []
    @State private var isLoadingCountries = false
    @State private var countryLoadError: String?

    @State private var email = ""
    @State private var password = ""
    @State private var firstName = ""
    @State private var lastName = ""
    @State private var selectedCountryCode = ""
    @State private var phoneNumber = ""
    @State private var street = ""
    @State private var city = ""
    @State private var state = ""
    @State private var postalCode = ""

    private var selectedCountry: CountryOption? {
        countries.first(where: { $0.code == selectedCountryCode })
    }

    private var formIsValid: Bool {
        email.contains("@")
            && password.count >= 8
            && !firstName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !lastName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !selectedCountryCode.isEmpty
            && phoneNumber.filter { $0.isNumber }.count >= 6
            && !street.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !city.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !state.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            && !postalCode.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Create account")
                .font(.title2.weight(.bold))
                .foregroundStyle(ChargingTheme.brightText)

            Group {
                TextField("Email", text: $email)
                    .textInputAutocapitalization(.never)
                    .keyboardType(.emailAddress)
                    .autocorrectionDisabled()

                SecureField("Password (min 8 chars)", text: $password)
                    .textInputAutocapitalization(.never)

                HStack {
                    TextField("First name", text: $firstName)
                    TextField("Last name", text: $lastName)
                }

                Picker("Country", selection: $selectedCountryCode) {
                    Text(isLoadingCountries ? "Loading..." : "Select a country").tag("")
                    ForEach(countries) { country in
                        Text("\(country.name) (\(country.code))").tag(country.code)
                    }
                }

                HStack {
                    Text(selectedCountry?.dialCode ?? "+")
                        .font(.headline)
                        .frame(width: 64)
                        .padding(.vertical, 12)
                        .background(Color.white.opacity(0.5))
                        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

                    TextField("Phone number", text: $phoneNumber)
                        .keyboardType(.phonePad)
                }

                TextField("Street", text: $street)
                HStack {
                    TextField("City", text: $city)
                    TextField("State", text: $state)
                }
                TextField("Postal code", text: $postalCode)
            }
            .padding()
            .background(Color.white.opacity(0.5))
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

            if let countryLoadError {
                Text(countryLoadError)
                    .font(.footnote)
                    .foregroundStyle(.red)
            }

            if let authError = sessionStore.authError {
                Text(authError)
                    .font(.footnote)
                    .foregroundStyle(.red)
            }

            Button {
                let digits = phoneNumber.filter { $0.isNumber }
                let dialCode = selectedCountry?.dialCode ?? "+"
                let request = RegisterRequest(
                    email: email.trimmingCharacters(in: .whitespacesAndNewlines),
                    password: password,
                    firstName: firstName.trimmingCharacters(in: .whitespacesAndNewlines),
                    lastName: lastName.trimmingCharacters(in: .whitespacesAndNewlines),
                    phoneNumber: "\(dialCode)\(digits)",
                    address: AddressDTO(
                        street: street.trimmingCharacters(in: .whitespacesAndNewlines),
                        city: city.trimmingCharacters(in: .whitespacesAndNewlines),
                        state: state.trimmingCharacters(in: .whitespacesAndNewlines),
                        postalCode: postalCode.trimmingCharacters(in: .whitespacesAndNewlines),
                        countryIsoCode: selectedCountryCode
                    )
                )

                Task {
                    _ = await sessionStore.register(request: request)
                }
            } label: {
                HStack {
                    if sessionStore.isBusy {
                        ProgressView()
                            .tint(.white)
                    }
                    Text(sessionStore.isBusy ? "Creating account..." : "Create account")
                        .fontWeight(.semibold)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .fill(formIsValid
                              ? LinearGradient(colors: [ChargingTheme.neonCyan, ChargingTheme.neonBlue], startPoint: .leading, endPoint: .trailing)
                              : LinearGradient(colors: [Color.gray.opacity(0.3), Color.gray.opacity(0.2)], startPoint: .leading, endPoint: .trailing)
                        )
                )
                .foregroundStyle(.white)
            }
            .disabled(!formIsValid || sessionStore.isBusy)
        }
        .task {
            guard countries.isEmpty, !isLoadingCountries else { return }
            await loadCountries()
        }
    }

    @MainActor
    private func loadCountries() async {
        isLoadingCountries = true
        defer { isLoadingCountries = false }

        if !authService.cachedCountries.isEmpty {
            countries = authService.cachedCountries
        } else {
            do {
                await authService.prefetchCountries()
                countries = authService.cachedCountries
            }
        }

        if selectedCountryCode.isEmpty {
            selectedCountryCode = countries.first?.code ?? ""
        }
    }
}
