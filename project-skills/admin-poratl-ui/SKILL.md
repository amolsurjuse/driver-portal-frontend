---
name: admin-poratl-ui
description: Use when working on the standalone React admin portal for Electra Hub, including login flow, user/admin user management screens, subscription UI, local dev setup, and backend integration expectations.
---

# Admin Portal UI

## Use This Skill For

- React UI work in `admin-poratl-ui`
- login and token handling
- user/admin user list behavior
- subscription portal screens
- local environment setup against dev or local backends

## Repo

- Path: `/Users/amolsurjuse/development/projects/admin-poratl-ui`

## Stack

- Vite
- React
- TypeScript

## Key Backend Dependencies

- Auth API: `https://dev.electrahub.com:8443/auth`
- User API: `https://dev.electrahub.com:8443/user`
- Subscription API: `https://dev.electrahub.com:8443/subscription`

Override them in `.env.local` when running against local services:

```bash
VITE_AUTH_API_BASE_URL=http://127.0.0.1:8080
VITE_USER_API_BASE_URL=http://127.0.0.1:8082
VITE_SUBSCRIPTION_API_BASE_URL=http://127.0.0.1:8086
```

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/admin-poratl-ui
npm install
npm run dev
```

## Current Behavior To Remember

- `Users` should use `GET /api/v1/users`
- `Admin Users` should use `GET /api/v1/admin/users`
- `Subscription` uses `subscription-service` plan APIs

If those tabs show the same data, check whether the frontend is still reusing the same API client/state for both sections.

## Dev Credentials

- Admin:
  - `sysadmin.dev@electrahub.com`
  - `Admin@12345`
- Plain user:
  - `driver.user.dev@electrahub.com`
  - `User@12345`

## Verification

```bash
npm run build
```

## Common Debug Checks

- CORS failures usually mean one of the backend services is missing the localhost origin
- `Failed to fetch` from browser usually means:
  - CORS preflight failed
  - TLS/certificate prompt not accepted in browser
  - backend URL mismatch in `.env.local`

## Related Services

Read these when the issue crosses repo boundaries:

- `/Users/amolsurjuse/development/projects/project-skills/auth-service/SKILL.md`
- `/Users/amolsurjuse/development/projects/project-skills/user-service/SKILL.md`
- `/Users/amolsurjuse/development/projects/project-skills/subscription-service/SKILL.md`
