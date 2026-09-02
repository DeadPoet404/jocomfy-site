# Jocomfy Website & Student Portal

Public marketing site and authenticated student/parent portal for Jocomfy
School. Next.js frontend; all data comes from the School Management System
API — this application owns no database.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Vitest + Testing Library + jsdom
- Docker + Caddy in production

## Layout

| Path | Purpose |
| --- | --- |
| `app/` | Routes: marketing pages, `/admissions`, `/portal/*` |
| `components/sections/` | Marketing page sections |
| `components/ui/` | Shared primitives |
| `lib/api-client.ts` | Fetch wrapper with single-flight refresh-token retry |
| `lib/auth-context.tsx` | Portal session context |
| `lib/portal-types.ts` | Shared response types |
| `tests/` | Vitest suites |

## Development

```bash
npm install
npm run dev            # http://localhost:3000
```

The portal expects the SMS backend to be reachable. Set
`NEXT_PUBLIC_SMS_API_URL`, or leave it unset to use the `/api` rewrite.

```bash
cp .env.example .env.local
```

## Checks

```bash
npm run lint
npm run typecheck
npm run test:run
```

All three run in CI on every push.

## Production

Built and served as a container behind Caddy, bound to loopback and fronted
by Cloudflare. See `Dockerfile`, `docker-compose.yml`, and `Caddyfile`.

Deployment follows the promotion path in the SMS repository's
`docs/DEPLOY-RUNBOOK.md`: commit, push, CI green, staging, staging
acceptance, then production.

## Portal routes

| Route | Purpose |
| --- | --- |
| `/portal/login` | Student sign-in |
| `/portal` | Dashboard |
| `/portal/academics` | Grades and attendance |
| `/portal/finance` | Invoices, balance, payment initiation |
| `/portal/fees/confirmation` | Post-payment confirmation |
| `/portal/password` | Password change (forced on first sign-in) |

## Notes

- Admissions is presentation-only. There is no application backend yet, so
  `/admissions/apply` redirects to `/admissions`.
- Payments are wired to Paystack in the API but not fully rolled out.
