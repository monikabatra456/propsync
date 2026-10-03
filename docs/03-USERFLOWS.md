# PropSync — User Flows

All diagrams are Mermaid (render in GitHub/Cursor preview). Screens refer to mockups: **M1** Login, **M2** Properties list, **M3** Add Property S1, **M4** Property detail, **M5** Admin.

## F1. Authentication (M1)

```mermaid
flowchart TD
  A[Open /login] --> B[Select role chip: Admin / Field Staff / Sales / Space Sales / Owner]
  B --> C{Method}
  C -->|Email + password| D[Enter email, password, Remember me]
  C -->|Continue with Google| G[Google OAuth]
  C -->|Login with OTP| O[Enter phone/email → receive OTP → verify]
  D --> V[Auth provider verifies]
  G --> V
  O --> V
  V -->|invalid| E[Inline error, stay on /login]
  V -->|valid| S{Account status}
  S -->|pending| P[Pending-approval banner/screen, no access]
  S -->|disabled| X[Blocked message]
  S -->|active| R{Selected role == account role?}
  R -->|no| E2[Error: wrong role selected]
  R -->|yes| L[Write audit log: Login]
  L --> H[Redirect /properties - Admin may go /admin]
  A --> F[Forgot password? → email link → /reset-password → /login]
```
Notes: role chip is a UX filter; the **real role comes from the token** and is enforced by the API. Default chip = Admin. Show password toggle on eye icon.

## F2. Employee signup & approval (M1 → M5)

```mermaid
sequenceDiagram
  actor U as New employee
  participant W as Web app
  participant A as Admin
  U->>W: Sign up (name, email, role requested, department)
  W-->>U: "Account pending approval" banner
  W->>A: Appears in Signup Approvals Queue (M5), badge "N pending"
  A->>W: Approve (→ status active, role set) or Reject
  W-->>U: Notification email/WhatsApp
  U->>W: Login now succeeds (F1)
  W->>W: Audit log entry (Create/Edit user)
```

## F3. Browse, search, filter properties (M2)

```mermaid
flowchart TD
  A[/properties/] --> B[See greeting + 4 KPI cards + first 5 cards]
  B --> C[Type in search: locality / district / project]
  B --> D[Filter: Land Use / Availability / Rent range]
  B --> E[Sort: Newest First ...]
  B --> M[Toggle Map View → pins with clustering → click pin → mini card → View Details]
  C --> R[Debounced 300ms request, list + count update, URL query updated]
  D --> R
  E --> R
  R --> P[Pagination 1..n, "Showing 1-5 of N"]
  B --> I[Card image arrows ‹ › cycle photos 1/5]
  B --> K[Bookmark icon → save/unsave]
  B --> Q[Kebab ⋮ → Duplicate / Archive / Delete admin only]
  B --> V[View Details → F5]
  B --> ED[Edit → F4 pre-filled]
  B --> SP[Share PPT → generate deck → download/copy link/WhatsApp]
  B --> N[+ Add New Property → F4]
```

## F4. Add property — 5-step stepper (M3)

```mermaid
flowchart TD
  S0[Click + Add New Property or sidebar Add Property] --> S1
  subgraph S1[Step 1 Address & Location]
    G[Browser asks GPS permission] -->|allowed| G1[Auto-fetch lat/lng, show 'Auto-fetched' chip]
    G -->|denied| G2[Manual pin on map / type address]
    G1 --> F[Fill Property Name, District, Locality, Pin Code]
    G2 --> F
    F --> MP[Drag pin to adjust → reverse-geocode → address auto-fills, editable via pencil]
    MP --> PH[Optional site photos: capture or upload, first = Main Image, ✕ removes]
  end
  S1 -->|Next: Building & Floors → validate required *| S2[Step 2 Building & Floors]
  S2 --> S3[Step 3 Area & Commercials]
  S3 --> S4[Step 4 Amenities & Compliance]
  S4 --> S5[Step 5 Media Upload]
  S5 --> SUB[Submit → status Under Verification → redirect /properties/id with success toast]
  S1 -->|Cancel| CF{Unsaved changes?}
  CF -->|yes| DC[Confirm discard / save draft]
  CF -->|no| BK[Back to /properties]
```
Rules: draft auto-saved per step (server draft; IndexedDB offline draft in Phase 2). Completed steps clickable in stepper; future steps locked until previous valid. Area unit toggle converts display only (stored in sq ft). "Use Current Location" re-requests GPS and overwrites pin. Footer banner: location verified during review.

## F5. View & manage a property (M4)

```mermaid
flowchart TD
  A[View Details] --> B[/properties/id Overview tab]
  B --> T[Tabs: Overview · Floor & Amenities · Compliance & Documents · Media & Gallery · Activity & Follow-up]
  B --> X[Export PPT → python-pptx → download]
  B --> SF[Schedule Follow-up → modal: date, channel, note → saved → n8n → WhatsApp reminder]
  B --> E[Edit → /properties/id/edit]
  B --> D[Delete → confirm modal → soft delete → back to list, audit log]
  B --> C[Contact card: phone icon → tel: · WhatsApp icon → wa.me link]
  B --> MAP[Open in Maps / View on Google Maps → new tab]
  B --> GL[Gallery: arrows 1/8, thumbnails, video 0:45 plays in lightbox]
  B --> BK[← Back to Properties keeps previous filters/page]
```
Every open of this page writes audit log **View** (visible in M5).

## F6. Admin operations (M5)

```mermaid
flowchart TD
  A[Admin opens /admin] --> K[KPIs: properties, field agents, users, storage]
  A --> U[User & Role Management]
  U --> U1[Search / Filter by role,status]
  U --> U2[+ Add User → modal → invite email]
  U --> U3[Toggle switch → enable/disable account]
  U --> U4[Kebab ⋮ → Change role / Reset password / View activity]
  A --> Q[Signup Approvals Queue]
  Q --> Q1[Approve → status active + notify]
  Q --> Q2[Reject → reason modal + notify]
  Q --> Q3[View All → /admin/approvals]
  A --> L[Audit Logs]
  L --> L1[Date range picker]
  L --> L2[Filter by user/action/resource]
  L --> L3[Export CSV]
```
Non-admin hitting `/admin` → 403 page.

## F7. Owner flow
Owner logs in → lands on read-only `/properties` filtered to `owner_id = me` → opens detail (no Edit/Delete/Contacts/Export) → can view compliance status and follow-up activity for own listings.

## F8. Field-staff on-site flow (PWA)
Open installed PWA on phone → Login → **Add Property** → allow GPS → capture photos with camera → fill step 1 → save draft (works offline in Phase 2) → continue steps → submit. Large videos upload via signed URL directly to storage.

## F9. Global behaviours
- Session expiry → `/login?next=<path>`.
- Notification bell: follow-up due, approval decisions, new assigned property.
- Global search (top bar) → results grouped Properties / Users (admin) / Audit (admin).
- Every create/edit/delete/export/login is audit-logged with user, role, IP, resource, details.
