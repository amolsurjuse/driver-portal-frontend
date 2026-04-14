---
name: electra-hub-org-page
description: Use when working on the static Electra Hub organization page, including Nginx packaging and simple HTML asset delivery.
---

# Electra Hub Org Page

## Repo

- Path: `/Users/amolsurjuse/development/projects/electra-hub-org-page`

## Stack

- Static HTML
- Nginx container

## Packaging

Dockerfile copies:

- `nginx/default.conf`
- `index.html`

into an Nginx image and serves on port `80`.

## Use This Repo For

- org landing page changes
- static marketing or informational page updates
- nginx route tweaks for this page
