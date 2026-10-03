# PropSync — Design System

Source: 5 mockups (1024 × 1536 px each). All values below are measured/estimated from those images at 1024px width = 1x. Where a value is an estimate, it is marked `~`. **Rule for the builder: when the mockup and this doc disagree, the mockup wins.**

Tagline: **Properties · People · Progress** | Product line: **Connect. Track. Grow.**

---

## 1. Colour tokens

```css
:root {
  /* Brand */
  --navy-900: #0B1F44;   /* sidebar bottom / deepest */
  --navy-800: #0F2A5C;   /* sidebar top, primary text on light */
  --navy-700: #14305E;   /* primary buttons (Login, Add New Property, View Details) */
  --blue-600: #2F5FA3;   /* sidebar active item bg (~) */
  --blue-link: #1560D4;  /* links: Forgot password?, Open in Maps */
  --teal-500: #2FA0A8;   /* accent line under tagline, checkbox, brand underline */

  /* Surfaces */
  --bg-page: #F3F6FB;    /* app background */
  --bg-card: #FFFFFF;
  --bg-subtle: #F7F9FC;  /* table header, tinted blocks */
  --bg-info: #E9F1FC;    /* info banners, "Tips" box */
  --bg-success-soft: #E8F6F0; /* verified/location banner */
  --border: #E3E8F0;
  --border-strong: #D3DBE6;

  /* Text */
  --text-900: #0F2547;   /* headings */
  --text-700: #34455F;   /* body */
  --text-500: #6B7A90;   /* secondary / helper */
  --text-400: #98A4B5;   /* placeholders */
  --text-on-dark: #FFFFFF;
  --text-on-dark-muted: #B8C5DB;

  /* Status */
  --green-600: #1E9E6A;  --green-50: #E3F6EE;   /* Available, Active, Verified, Valid */
  --orange-600: #E8870E; --orange-50: #FFF0D9;  /* Under Verification, Pending */
  --gray-600: #5B6B80;   --gray-100: #ECEFF4;   /* Rented */
  --red-600: #E5484D;    --red-50: #FDECEC;     /* Delete, Reject, Owner */
  --purple-600: #6B4FD8; --purple-50: #EDE7FB;  /* Admin */
  --blue-500: #2563C9;   --blue-50: #E3EEFC;    /* Sales, View, Edit */
  --teal-600: #1B8F94;   --teal-50: #DFF3F3;    /* Create */
}
```

### Role badges (Admin panel)
| Role | Text | Bg |
|---|---|---|
| Admin | purple-600 | purple-50 |
| Sales | blue-500 | blue-50 |
| Field | green-600 | green-50 |
| Space Sales | orange-600 | orange-50 |
| Owner | red-600 | red-50 |

### Audit action badges
View = blue · Edit = blue · Delete = red · Login = green · Create = teal · Export = orange.

### Sidebar gradient
`linear-gradient(180deg, #0F2A5C 0%, #0B1F44 100%)`. Login hero panel: building photo with navy overlay `linear-gradient(180deg, rgba(20,48,94,.85) 0%, rgba(20,48,94,.35) 55%, rgba(11,31,68,.9) 100%)`.

---

## 2. Typography

Font: **Inter** (fallback `system-ui, sans-serif`). Icons: **Lucide** (1.75px stroke, 20px default).

| Token | Size / Line | Weight | Used for |
|---|---|---|---|
| display | 36 / 44 | 600 | Login hero "Smarter Real Estate Management" (white) |
| h1 | 32 / 40 | 700 | "Welcome Back" |
| h1-page | 26 / 34 | 700 | "Admin Panel", "John Doe" greeting, detail title (28/36) |
| h2 | 20 / 28 | 600 | Section titles (Properties (24), Property Overview, Audit Logs) |
| h3 | 17 / 24 | 600 | Property card title, "Contact Details" |
| body | 14 / 20 | 400–500 | Inputs, table cells, descriptions |
| small | 12 / 16 | 400–500 | Helper text, meta labels, table headers (600) |
| badge | 11 / 14 | 500–600 | Status/role chips |
| nav | 15 / 20 | 500 | Sidebar items |
| stat | 30 / 36 | 700 | KPI numbers (24, 16, 5, 3, 247, 48) |

---

## 3. Spacing, radius, shadow

- Base unit **4px**. Common gaps: 8, 12, 16, 20, 24, 32.
- Radius: input/button **10px** · card **12–14px** · login card **24px** · chip/pill **999px** · badge **6px** · avatar **50%**.
- Shadows: card `0 1px 2px rgba(15,37,71,.04), 0 4px 16px rgba(15,37,71,.04)`; login card `0 24px 60px rgba(15,37,71,.12)`.
- Border: 1px `--border`.

---

## 4. App shell (all authenticated pages)

| Part | Spec |
|---|---|
| Sidebar | width **~198px**, fixed, navy gradient, full height |
| Logo block | top 24px, left 28px; icon 34px + "PropSync" 24px/600 white |
| Nav item | height **~44px**, margin 0 12px, radius 8, icon 20 + 12px gap + label; active bg `--blue-600` |
| Nav order | Dashboard, Properties, Add Property, Leads, Reports, Settings, **Admin (admin role only, shield icon)** |
| Sidebar footer | shield icon, "Smarter Real Estate Management" 14/500 white, 32px teal line, "Connect. Track. Grow." 12px muted. (Admin screen variant: "Secure & Trusted — Your data is protected with industry standard security.") |
| Top bar | height **~66px**, white, bottom border; padding 0 30px |
| Search | left, width ~465px, height 34px, radius 8, placeholder "Search by locality, district, or project name…" (Admin: "Search users, properties, or audit logs…") |
| Right cluster | bell (red dot 8px), avatar 36px navy circle with initials "JD", name 14/600 + role 12px (Sales / Admin), chevron-down |
| Content area | bg `--bg-page`, padding **30px** (detail/admin ~ 22px), max-width fluid |

---

## 5. Components

**Primary button** — h 40–60 (Login 60, others 40), bg navy-700, white 14/600, radius 10, trailing arrow icon where shown.
**Secondary / outline** — white bg, 1px border-strong, text navy, same radius (Edit, Share PPT, Schedule Follow-up, Filter, Export, View All).
**Danger outline** — red text/border, red-50 bg (Delete, Reject).
**Success solid** — green-600 bg white text (Approve), h 28, radius 6, with icon.
**Role chip (login)** — h 46, radius 999, padding 0 16, icon 18 + label; selected = navy-700 bg white text; unselected = `#EEF2F8` bg, border, navy text. Two rows: [Admin, Field Staff, Sales] / [Space Sales, Owner].
**Input** — h 62 (login) / 36–40 (forms), radius 10, 1px border, leading icon 20 `--text-500`, placeholder `--text-400`, focus ring 2px `--blue-600`.
**Select** — same as input + chevron-down right.
**Checkbox** — 22px, radius 5, teal fill with white check.
**Divider with "or"** — 1px lines either side, "or" 14px muted centred.
**Stat card** — white, radius 12, ~180×113, icon tile 44px (bg `#EEF2F8`, navy icon) top-left, label 13px, number 30/700, delta line 12px (green with ↑ for positive, muted otherwise).
**Status badge (pill)** — h 20, padding 0 8, radius 6, 11px/500, leading dot/diamond icon; colours per status above.
**Property card (list)** — white, radius 12, padding 16, image 185×167 radius 8 with "‹ 1/5 ›" overlay chip bottom (black 55% alpha, white text); right column: badge, title 17/600, pin + location 13px muted, 3-item meta row (area+sqyd, land use, ₹ rent), description 13px muted, action row right-aligned [View Details (primary h34), Edit, Share PPT]; bookmark + kebab icons top-right. Card gap 14px.
**Stepper** — 5 steps; circle 40px; active navy with white number, inactive white with 1px `#BFD2EC` border and blue number; connector 1px `#BFD2EC`; label 13px below (active = navy 600, inactive = muted).
**Info banner** — bg `--bg-info`, radius 10, padding 14–16, info icon blue, title 14/600 + body 13px muted.
**Success banner** — bg `--bg-success-soft`, shield-check icon, green text 12px.
**Dropzone** — 1px dashed `--border-strong`, radius 12, camera icon 32, "Add Photos" 14/600, "Tap to capture or upload" 12px muted.
**Table** — header bg `--bg-subtle`, 12/600 text, row height ~54 (users/approvals) / ~60 (audit), 1px row dividers, avatar 28px circle in name cell, sortable header shows ⇅.
**Toggle switch** — 40×22, on = blue-600, off = gray-200.
**Pagination** — squares 32, radius 6; active navy; prev/next chevrons; right text "Showing 1–5 of 24 properties".
**Tabs (detail)** — icon + label, 13/500, active navy with 2px bottom underline blue-600; 5 tabs.
**Map card** — radius 12, 1px border, Google Map; "Map | Satellite" segmented control top-left (active navy), zoom +/− and locate buttons right, floating "Drag the pin to adjust location" chip bottom-left.

---

## 6. Screen specs

### 6.1 Login (`/login`)
- Two columns: **left 423px (41%)** hero photo; **right** bg `#E9EFF8` with soft circular shapes top-right/bottom-right.
- Left: logo (top 85px, left 66px) + "Properties · People · Progress" 18px muted; hero text at y≈300: display 36/600 white on 3 lines; subline "Connect. Track. Grow." 20px; 40×3px teal bar; bottom: shield icon + "Secure & Trusted" 15/600 + "Your data is protected with industry standard security." 14px muted.
- Right card: x 457→981 (**524px wide**), y 267→1296 (**~1030px tall**), white, radius 24, padding 48.
- Order inside card: logo (navy) → "Welcome Back" → "Sign in to your account to continue" → "Login as" label 14/500 → role chips → Email (h62) → Password (h62, eye toggle) → row [Remember me checkbox | Forgot password? link] → **Login →** (full width, h60) → "or" divider → two outline buttons side by side [Continue with Google (G logo) | Login with OTP (phone icon)], h60 → info banner "Account pending approval? Your account is under review by the admin. You'll be notified once it's approved."
- Default selected chip: **Admin**.

### 6.2 Properties list (`/properties`)
1. Greeting: "Good morning," 14px muted → name 26/700 → "Here's your property overview and latest listings." Right: **+ Add New Property** (primary, h44).
2. 4 stat cards (equal width, gap 14): Total Properties 24 (↑ 3 new this week) · Available 16 (67% of total) · Under Negotiation 5 (21% of total) · New This Week 3 (+12% from last week).
3. Filter card: search input (w ~330) + segmented **List View | Map View** (right, active navy); below: 3 labelled selects — **Land Use**, **Availability**, **Rent / Price Range** (all default "All"). *Mockup typos "Tonal Use"/"Availablity" → build as "Land Use"/"Availability".*
4. Header row: "Properties (24)" h2, right "Sort by: Newest First ⌄".
5. Property cards (5 per page), then pagination 1–5.
Sample data (use as seed): Premium Office Space – Sector 62 (Available, 5,000 sq ft/464 sq yd, Office, ₹18); Retail Space – Cyber City (Under Verification, 2,500, Retail, ₹120); Warehouse – Bhiwandi (Rented, 10,000, Industrial, ₹8); Commercial Space – Connaught Place (Available, 3,200, Commercial, ₹250); Residential Land – Dwarka Expressway (Available, 12,000, Residential, ₹10).

### 6.3 Add New Property — Step 1 (`/properties/new`)
- White container card on page bg: back arrow + "Add New Property" 24/700 + subtitle; stepper below, divider.
- Steps: 1 Address & Location · 2 Building & Floors · 3 Area & Commercials · 4 Amenities & Compliance · 5 Media Upload.
- Section header: pin icon tile + "1. Address & Location" + helper text.
- GPS strip: bg `--bg-info`, pin icon, "Current GPS Location" + green "Auto-fetched" chip + "28.6139° N, 77.2090° E"; right button **Use Current Location**.
- Two columns: left (≈340px) fields — Property Name*, District* (select), Locality / Area* (select), Pin Code*; right map card (~392×292).
- Address card: "Address (Auto-filled from location)" with textarea (h ~70) + pencil edit icon.
- Photos card: title, helper "Capture current site photos for verification (optional)."; thumbnails 190×140 with "Main Image" green chip + ✕; dashed "Add Photos" tile; right "Tips for better photos" info box with 3 bullets.
- Quick Location Details card: 4 mini-tiles (Latitude 28.6139°, Longitude 77.2090°, Accuracy ± 5 m, Source Browser GPS) + success banner "Location & address will be verified during review. You can make changes in the next steps."
- Footer: **Cancel** (disabled-looking outline, left) · **Next: Building & Floors →** (primary, right).
- Steps 2–5 are **not designed** — build with the same card/stepper/field styles (see sitemap for fields).

### 6.4 Property detail (`/properties/[id]`)
- Top action bar: "← Back to Properties" left; right buttons **Export PPT** (primary), **Schedule Follow-up**, **Edit**, **Delete** (danger).
- Title block: status badge, title 28/700, pin + address. Right card **Contact Details**: Rohit Sharma (Landlord, +91 98765 43210), Neha Verma (Broker, +91 91234 56789), each with call + WhatsApp round buttons.
- Summary strip (4 cells): Total Area 5,000 sq ft · Rent ₹18 / sq ft / month · Property Type Office · Listed By S. R. Properties.
- Media row: main image (~327×243, counter "1/8", arrows) + 4 thumbs stacked (one video with play + "0:45") — left; **Property Location** map card right with "View on Google Maps" link.
- Tabs: Overview · Floor & Amenities · Compliance & Documents · Media & Gallery · Activity & Follow-up.
- **Property Overview** card: 3 columns — (1) key/value list: Property Name, Type, Total Area, Rent, Security Deposit (3 Months), Maintenance (₹2/sq ft/month), Lease Term (3+ Years Negotiable); (2) Address, GPS Coordinates + "Open in Maps", Locality, District, Pin Code; (3) image + **Key Highlights** with green checks. Edit button top-right.
- **Floor & Amenity Breakdown**: table Floor | Carpet Area (sq ft) | Built-up Area (sq ft) | Rent (₹/sq ft/month) | Availability | Key Facilities; rows Ground–4th (1,000 / 1,250 / 22,20,20,18,18). "View Floor Plan" button. Below: **Building Amenities** chips — Lift, Power Backup, Parking, CCTV, 24/7 Security, WiFi, AC.
- **Compliance & Documents**: table Document/Approval | Status | Valid Until | Remarks (Title Deed Verified; Building Plan Approval Verified; Fire Safety Certificate Valid Dec 2025; RERA Registration Valid Mar 2028 `NOIDA/2024/6789`; Environmental Clearance Pending). Footer info banner: *Compliance ensures Aadhaar/sensitive ID check adherence. We store only last 4 digits / DigiLocker status as per policy.*

### 6.5 Admin panel (`/admin`) — Admin role only
- Header: shield icon, "Admin Panel" 26/700, subtitle, right "Last updated Apr 26, 2025 • 02:45 PM" with green dot.
- 4 stat cards: Total Properties 247 (↑12%) · Active Field Agents 16 (↑6%) · Total Users 48 (↑8%) · Storage Usage 12.4 GB / 100 GB (progress bar, 12% used).
- **User & Role Management**: search users, Filter, **+ Add User**; table (checkbox, Name+avatar, Email, Role, Status, Last Login, Actions = toggle + kebab); footer "Showing 1–8 of 48 users" + pagination.
- **Signup Approvals Queue**: "3 pending" orange chip, View All; table Name, Email, Role Requested, Department, Submitted On (sortable), Actions [Approve | Reject]. *(Mockup shows 4 rows while chip says 3 — make chip dynamic.)*
- **Audit Logs**: date-range picker (Apr 19–Apr 26, 2025), Filter, Export; table Time, User (avatar + name + role), Action badge, Resource, Details (2 lines), IP Address.

---

## 7. Responsive / PWA rules (beyond mockups)
- ≥1280: layout as designed (sidebar 198px).
- 768–1279: sidebar collapses to 72px icon rail; stat cards 2×2; property card stacks image on top at ≤900.
- <768: sidebar becomes bottom tab bar (Dashboard, Properties, Add, Leads, More) + hamburger drawer; tables become cards; stepper shows "Step 1 of 5" with progress bar; sticky bottom action bar for Cancel / Next.
- Touch targets ≥ 44px. Camera: `<input type="file" accept="image/*" capture="environment">`.

## 8. Accessibility
Contrast ≥ 4.5:1 for body text; visible focus rings; all icon buttons have `aria-label`; badges never rely on colour alone (icon + text); form errors inline in red-600 under field.
