import SwiftUI

private enum AuthScreen: String, CaseIterable, Identifiable {
    case login = "Sign In"
    case register = "Register"

    var id: String { rawValue }
}

// MARK: - Electra Hub Logo (Programmatic)

struct ElectraHubLogo: View {
    var size: CGFloat = 64

    var body: some View {
        ZStack {
            // Outer glow ring
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.0, green: 0.75, blue: 1.0).opacity(0.25),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: size * 0.3,
                        endRadius: size * 0.55
                    )
                )
                .frame(width: size * 1.2, height: size * 1.2)

            // Main circle with gradient
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            Color(red: 0.06, green: 0.35, blue: 0.72),
                            Color(red: 0.10, green: 0.55, blue: 0.95),
                            Color(red: 0.0, green: 0.75, blue: 1.0)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: size, height: size)
                .shadow(color: Color(red: 0.06, green: 0.35, blue: 0.72).opacity(0.35), radius: 16, y: 8)

            // Lightning bolt icon
            Image(systemName: "bolt.fill")
                .font(.system(size: size * 0.42, weight: .bold))
                .foregroundStyle(.white)
                .shadow(color: .white.opacity(0.5), radius: 4)
        }
    }
}

// MARK: - Auth Flow View

struct AuthFlowView: View {
    let services: AppServices

    @State private var screen: AuthScreen = .login
    @State private var logoAppeared = false

    var body: some View {
        NavigationStack {
            ZStack {
                // Gradient background with subtle animated mesh
                LinearGradient(
                    colors: [
                        Color(red: 0.94, green: 0.96, blue: 1.0),
                        Color(red: 0.88, green: 0.94, blue: 0.99),
                        Color.white
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()

                ScrollView {
                    VStack(alignment: .leading, spacing: 28) {
                        // Logo + Branding header
                        VStack(alignment: .leading, spacing: 16) {
                            HStack(spacing: 14) {
                                ElectraHubLogo(size: 56)
                                    .scaleEffect(logoAppeared ? 1.0 : 0.5)
                                    .opacity(logoAppeared ? 1.0 : 0)

                                VStack(alignment: .leading, spacing: 2) {
                                    Text("Electra Hub")
                                        .font(.system(size: 26, weight: .bold, design: .rounded))
                                        .foregroundStyle(
                                            LinearGradient(
                                                colors: [
                                                    Color(red: 0.06, green: 0.35, blue: 0.72),
                                                    Color(red: 0.10, green: 0.55, blue: 0.95)
                                                ],
                                                startPoint: .leading,
                                                endPoint: .trailing
                                            )
                                        )
                                    Text("Driver Portal")
                                        .font(.caption.weight(.semibold))
                                        .foregroundStyle(.secondary)
                                }
                            }

                            Text("Manage charging sessions, wallet, payments, and your profile — all in one place.")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
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
                            .foregroundStyle(.tertiary)
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

            TextField("Email", text: $email)
                .textInputAutocapitalization(.never)
                .keyboardType(.emailAddress)
                .autocorrectionDisabled()
                .padding()
                .background(Color(.secondarySystemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))

            SecureField("Password", text: $password)
                .textInputAutocapitalization(.never)
                .padding()
                .background(Color(.secondarySystemBackground))
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
                .background(formIsValid ? Color.blue : Color.gray.opacity(0.4))
                .foregroundStyle(.white)
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
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
                        .background(Color(.secondarySystemBackground))
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
            .background(Color(.secondarySystemBackground))
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
                .background(formIsValid ? Color.blue : Color.gray.opacity(0.4))
                .foregroundStyle(.white)
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
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

        // Use the in-memory cache populated at app launch
        if !authService.cachedCountries.isEmpty {
            countries = authService.cachedCountries
        } else {
            // Fallback: fetch if cache wasn't populated (e.g. network was down at launch)
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
