# PropSync — Tech Stack & Build Brief (read this first)

Product: responsive **web app / PWA** (not native). Field staff use phone browser (GPS + camera). UI must match `docs/01-DESIGN-SYSTEM.md` and mockups exactly. Routes in `02-SITEMAP.md`, flows in `03-USERFLOWS.md`.

## 1. Stack (fixed — do not substitute)

| Layer | Choice |
|---|---|
| Frontend | **Next.js 14+ (App Router), TypeScript, Tailwind CSS**, shadcn/ui (restyled to tokens), lucide-react, react-hook-form + zod, TanStack Query |
| Maps | Google Maps JS API via `@vis.gl/react-google-maps`; Geocoding API; marker clustering |
| Backend | **FastAPI**, Pydantic v2, SQLAlchemy 2, **Alembic**, Uvicorn |
| DB | **PostgreSQL** (Supabase / Neon / Railway) |
| Auth | **Supabase Auth** (email+password, Google, phone OTP) → JWT verified in FastAPI. Role stored in `users.role` and JWT claim |
| Storage | Supabase Storage (or S3) private buckets + CDN; direct upload via signed URLs |
| PPT | `python-pptx` in `services/ppt.py` |
| Automation | n8n + WhatsApp Cloud API (follow-up reminders) |
| PWA | `manifest.json`, service worker (next-pwa/serwist), HTTPS |
| Hosting | Vercel (web), Railway/Render (API), subdomain `api.<domain>` |
| Monitoring | Sentry (web+api), UptimeRobot |
| CI | GitHub Actions: lint, test, deploy. Branches: `main`, `develop`, feature/* |

## 2. Repo layout

```
property-expert/
  apps/web/              # Next.js
    app/(auth)/login/
    app/(app)/{dashboard,properties,leads,reports,settings,admin}/
    components/{ui,layout,property,admin}/
    lib/{api.ts,supabase.ts,units.ts}
    styles/tokens.css    # from design system
  apps/api/app/{main.py,core,models,schemas,routers,services}
  apps/api/alembic/  apps/api/tests/
  docs/                  # these 4 files
  .env.example           # never commit .env
```

## 3. Tailwind config (paste from design tokens)

```ts
theme.extend.colors = {
  navy: { 900:'#0B1F44', 800:'#0F2A5C', 700:'#14305E' },
  brand: { 600:'#2F5FA3', link:'#1560D4', teal:'#2FA0A8' },
  page:'#F3F6FB', subtle:'#F7F9FC', info:'#E9F1FC',
  line:'#E3E8F0', 'line-strong':'#D3DBE6',
  ink: { 900:'#0F2547', 700:'#34455F', 500:'#6B7A90', 400:'#98A4B5' },
}
theme.extend.fontFamily.sans = ['Inter','system-ui','sans-serif']
theme.extend.borderRadius = { card:'12px', field:'10px', login:'24px' }
```
Full token list: `01-DESIGN-SYSTEM.md §1`.

## 4. Database (module 1)

Tables: `users, roles, properties, floors, amenities, property_media, compliance_docs, contacts, landlords, commercials, availability_followups, audit_logs`.
- `properties 1─n floors; floors n─n amenities`.
- Area stored in **sq ft**; UI converts to sq yd / acre / sq m (`lib/units.ts`; 1 sq yd = 9 sq ft).
- Every table: `id (uuid), created_at, updated_at, created_by, is_deleted`.
- Compliance: `doc_type, status, expected_date, valid_until, remarks, file_url`. **Aadhaar: store last 4 digits / DigiLocker status only.**
- Indexes: locality, district, land_use, availability, rent, owner_id.
- Schema changes only via Alembic.

## 5. API surface (v1, all prefixed `/api/v1`)

```
POST /auth/session      GET /me
GET  /properties        POST /properties      GET/PATCH/DELETE /properties/{id}
GET  /properties/stats  POST /properties/{id}/floors   PUT /properties/{id}/compliance
POST /media/signed-url  POST /media/confirm   DELETE /media/{id}
POST /properties/{id}/ppt           POST /properties/{id}/followups
GET  /admin/stats  /admin/users  PATCH /admin/users/{id}  /admin/approvals  POST /admin/approvals/{id}/(approve|reject)
GET  /admin/audit   GET /admin/audit/export
```
Every route uses `Depends(require_role(...))`; owners filtered by `owner_id`. Audit-log middleware on view/create/edit/delete/login/export.

## 6. Build order (do exactly this, one phase at a time, commit after each)

1. Monorepo scaffold, env, Tailwind tokens, Inter font, app shell (sidebar + top bar) — **match M2 shell**.
2. Auth + roles: `/login` per M1, Supabase wiring, `/me`, route guards, pending-approval state.
3. DB models + first Alembic migration + seed data from sample cards.
4. Properties list (M2): stats, filters, cards, pagination, sort; then Map View.
5. Add Property stepper (M3): step 1 pixel-match, then steps 2–5 in same style.
6. Media upload with signed URLs (+ camera capture on mobile).
7. Property detail (M4): all tabs, gallery, contacts, compliance.
8. Edit + delete (soft).
9. PPT export.
10. Follow-ups (n8n + WhatsApp).
11. Admin (M5): users, approvals, audit, export.
12. PWA, responsive pass, tests (pytest + role matrix), Sentry, deploy staging.

## 7. Rules for the coding tool

- Match mockups first: spacing, radius, colours, copy text exactly (fix only typos listed in design system §6.2).
- Build reusable components (`StatCard`, `StatusBadge`, `RoleBadge`, `PropertyCard`, `Stepper`, `DataTable`, `InfoBanner`) before pages.
- No hard-coded colours — use tokens. No inline styles.
- Security enforced on backend; never trust UI role hiding.
- CORS only for own domains. Validate all input with Pydantic/zod. Secrets only in env.
- Never store full Aadhaar, card data, or passwords.
- Write pytest for auth, role matrix, and property CRUD with each backend phase.
- After each phase: run lint + tests, list what's done, wait for next instruction.

## 8. Known mockup inconsistencies (resolve as below)
- Address "Sector 62, Noida, Uttar Pradesh" but District "Gurgaon", PIN 122102 (Gurgaon) vs 201309 (Noida) → treat as sample data; validate district/PIN consistency in real app.
- "Tonal Use" / "Availablity" typos → "Land Use" / "Availability".
- Approvals chip "3 pending" with 4 rows → compute from data.
- Dates show 2025 → seed data only.
- Only Step 1 of Add Property and Admin/Properties/Detail/Login are designed; Dashboard, Leads, Reports, Settings, Steps 2–5 reuse design system.

## 9. Env template (`.env.example`)
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
DATABASE_URL=
SUPABASE_JWT_SECRET=
STORAGE_BUCKET=
WHATSAPP_TOKEN=
N8N_WEBHOOK_URL=
SENTRY_DSN=
ALLOWED_ORIGINS=
```

## 10. First prompt to give the tool
> Read `docs/00-TECH-STACK-AND-BUILD-BRIEF.md`, `01-DESIGN-SYSTEM.md`, `02-SITEMAP.md`, `03-USERFLOWS.md`. Execute Phase 1 only (scaffold + tokens + app shell matching the Properties mockup). Stop and report.
