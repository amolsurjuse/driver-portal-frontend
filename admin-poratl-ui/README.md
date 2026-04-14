# admin-poratl-ui

Standalone React admin portal for Electra Hub system administrators.

## Environment

Create a `.env.local` from `.env.example` if you want to override the defaults:

```bash
VITE_AUTH_API_BASE_URL=https://dev.electrahub.com:8443/auth
VITE_USER_API_BASE_URL=https://dev.electrahub.com:8443/user
VITE_SUBSCRIPTION_API_BASE_URL=https://dev.electrahub.com:8443/subscription
```

Run the app on `http://localhost:4200` when targeting the shared dev backends, because the deployed CORS configuration already allows that origin.

## Dev admin account

When `user-service` runs with the `local` or `dev` Spring profile, the seeded admin account is:

- Email: `sysadmin.dev@electrahub.com`
- Password: `Admin@12345`

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
