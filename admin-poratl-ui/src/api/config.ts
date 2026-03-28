export const authApiBaseUrl =
  import.meta.env.VITE_AUTH_API_BASE_URL ?? 'https://dev.electrahub.com:8443/auth';

export const userApiBaseUrl =
  import.meta.env.VITE_USER_API_BASE_URL ?? 'https://dev.electrahub.com:8443/user';

export const subscriptionApiBaseUrl =
  import.meta.env.VITE_SUBSCRIPTION_API_BASE_URL ?? 'https://dev.electrahub.com:8443/subscription';

export const chargerApiBaseUrl =
  import.meta.env.VITE_CHARGER_API_BASE_URL ?? 'https://dev.electrahub.com:8443/charger';

export const pricingApiBaseUrl =
  import.meta.env.VITE_PRICING_API_BASE_URL ?? 'https://dev.electrahub.com:8443/pricing';
