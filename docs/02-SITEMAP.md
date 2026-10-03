# PropSync — Sitemap

Legend: ✅ designed in mockup · 🟡 implied by mockup/guide, design not provided (reuse design system) · ⏳ later phase

## 1. Route tree (Next.js App Router)

```
/                          → redirect: logged in ? /properties : /login
/login                     ✅ Image 1  (public)
  ├─ /login/otp            🟡 OTP entry (Login with OTP)
  ├─ /forgot-password      🟡
  ├─ /reset-password       🟡
  ├─ /signup               🟡 employee signup → creates "pending" account
  └─ /pending-approval     🟡 shown if account not approved

/dashboard                 🟡 sidebar item "Dashboard" (KPIs; reuse stat cards)
/properties                ✅ Image 2  list (List View | Map View toggle)
  ├─ /properties?view=map  🟡 Map View (Google Maps, clustered pins)
  ├─ /properties/new       ✅ Image 3  stepper, Step 1 only designed
  │    ├─ step=1 Address & Location        ✅
  │    ├─ step=2 Building & Floors         🟡
  │    ├─ step=3 Area & Commercials        🟡
  │    ├─ step=4 Amenities & Compliance    🟡
  │    └─ step=5 Media Upload              🟡
  └─ /properties/[id]      ✅ Image 4  detail
       ├─ ?tab=overview              ✅
       ├─ ?tab=floors                ✅ (Floor & Amenity Breakdown)
       ├─ ?tab=compliance            ✅
       ├─ ?tab=media                 🟡 (Media & Gallery)
       ├─ ?tab=activity              🟡 (Activity & Follow-up)
       └─ /properties/[id]/edit      🟡 same stepper pre-filled
/add-property              → alias of /properties/new (sidebar "Add Property")
/leads                     🟡 sidebar "Leads"
/reports                   🟡 sidebar "Reports"
/settings                  🟡 profile, notifications, consent (DPDP)
/admin                     ✅ Image 5  (Admin only)
  ├─ #users                ✅ User & Role Management
  ├─ #approvals            ✅ Signup Approvals Queue  (+ /admin/approvals "View All" 🟡)
  └─ #audit                ✅ Audit Logs              (+ /admin/audit "Filter/Export" 🟡)
```

## 2. Global navigation

Sidebar (order exact): **Dashboard → Properties → Add Property → Leads → Reports → Settings → Admin\***
\*Admin item shown only to role `admin`. Active state = filled `--blue-600` row.
Top bar on every authed page: global search · notification bell (red dot if unread) · user menu (avatar, name, role, chevron → Profile, Settings, Logout).

## 3. Role access matrix

| Page / Action | Admin | Sales | Space Sales | Field | Owner |
|---|---|---|---|---|---|
| Login | ✔ | ✔ | ✔ | ✔ | ✔ |
| Dashboard | ✔ | ✔ | ✔ | ✔ | own only |
| Properties list / detail | all | all | all | all | **own only** (`owner_id = me`) |
| Add / Edit property | ✔ | ✔ | ✔ | ✔ | ✖ |
| Delete property | ✔ | ✖ | ✖ | ✖ | ✖ |
| Export / Share PPT | ✔ | ✔ | ✔ | ✔ | ✖ |
| Schedule follow-up | ✔ | ✔ | ✔ | ✖ | ✖ |
| Contact details (phones) | ✔ | ✔ | ✔ | ✔ | ✖ |
| Leads | ✔ | ✔ | ✔ | ✖ | ✖ |
| Reports | ✔ | ✔ | ✔ | ✖ | ✖ |
| Admin panel | ✔ | ✖ | ✖ | ✖ | ✖ |

*(Adjust with client. Enforcement is backend `require_role(...)`; hiding in UI is cosmetic.)*

## 4. Page inventory — components per page

| Page | Key components | Data / API |
|---|---|---|
| Login | RoleChips, EmailInput, PasswordInput, RememberMe, GoogleButton, OtpButton, PendingBanner, HeroPanel | `POST /auth/login`, Supabase/Firebase token → `GET /me` |
| Properties list | Greeting, 4×StatCard, FilterBar (search, Land Use, Availability, Rent range, List/Map), SortSelect, PropertyCard×n, Pagination | `GET /properties?q&land_use&availability&rent_min&rent_max&sort&page`, `GET /properties/stats` |
| Add Property (S1) | Stepper, GpsStrip, Form, MapPicker, AddressTextarea, PhotoUploader, TipsBox, LocationTiles, VerifyBanner, Footer nav | `POST /properties` (draft), `POST /media/signed-url`, Geocoding API |
| Property detail | ActionBar, Title, ContactsCard, SummaryStrip, Gallery, LocationMap, Tabs, OverviewCard, FloorTable, AmenityChips, ComplianceTable, PrivacyNote | `GET /properties/{id}` (+floors, media, compliance, contacts) |
| Admin | StatCards, UsersTable, ApprovalsTable, AuditTable, DateRange, Filter, Export | `GET /admin/stats`, `/admin/users`, `/admin/approvals`, `/admin/audit` |

## 5. Add Property — fields per step (from guide; step 1 matches mockup)

1. **Address & Location**: property_name*, district*, locality*, pin_code*, address (auto), lat, lng, accuracy_m, source, site photos (optional)
2. **Building & Floors**: building name, total floors, floors[] (floor label, carpet area, built-up area), age, lift/parking counts
3. **Area & Commercials**: total area (unit toggle sq ft / sq yd / acre / sq m — stored in sq ft), land use, rent/sq ft/month, security deposit, maintenance, lease term, availability status, landlord & broker contacts
4. **Amenities & Compliance**: amenity chips (Lift, Power Backup, Parking, CCTV, 24/7 Security, WiFi, AC…), compliance docs (status yes/no, expected_date, file_url): Title Deed, Building Plan Approval, Fire Safety, RERA, Environmental Clearance
5. **Media Upload**: photos, video, documents (direct-to-storage signed URLs), main image selection, review & submit

## 6. Status vocabularies

- Property availability: `available`, `under_verification`, `under_negotiation`, `rented`
- Compliance: `verified`, `valid`, `pending`, `expired`
- User: `active`, `pending`, `disabled`
- Audit actions: `view`, `edit`, `delete`, `login`, `create`, `export`
- Land use: Office, Retail, Industrial, Commercial, Residential

## 7. Empty / error / system states (must exist)
404, 403 (role blocked), 500, offline banner (PWA), empty list ("No properties match your filters" + Clear filters), upload failed + retry, session expired → /login?next=…
