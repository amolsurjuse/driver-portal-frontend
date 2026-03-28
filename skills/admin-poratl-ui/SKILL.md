---
name: admin-poratl-ui
description: Use when working on the standalone React admin portal for Electra Hub, including local setup, auth integration, user/admin-user screens, and subscription UI wiring.
---

# Admin Portal UI

## Repo

- Path: `/Users/amolsurjuse/development/projects/admin-poratl-ui`

## Stack

- Vite
- React
- TypeScript

## Backends

- Auth: `https://dev.electrahub.com:8443/auth`
- User: `https://dev.electrahub.com:8443/user`
- Subscription: `https://dev.electrahub.com:8443/subscription`

Use `.env.local` for overrides.

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/admin-poratl-ui
npm install
npm run dev
```

## Current Data Split

- `Users` should call `GET /api/v1/users`
- `Admin Users` should call `GET /api/v1/admin/users`
- `Subscription` uses `/api/v1/subscriptions/*`

## Dev Credentials

- Admin: `sysadmin.dev@electrahub.com` / `Admin@12345`
- Plain user: `driver.user.dev@electrahub.com` / `User@12345`

## Verification

```bash
npm run build
```
