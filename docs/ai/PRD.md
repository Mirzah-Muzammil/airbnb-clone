# PRD — Mini Airbnb-Style Property Listing App

> **⚠️ AGENT INSTRUCTION — READ THIS FIRST, EVERY TIME**
>
> Before executing **any** task, writing **any** code, or making **any** decision, you must:
>
> 1. Open and read this file in full: `docs/ai/PRD.md`
> 2. Identify which phase you are currently in
> 3. Complete that phase's checklist before moving to the next
>
> **Never skip ahead. Never assume. Always re-read this PRD when resuming a session.**

---

## Project Structure

```
airbnb-clone/
├── docs/
│   └── ai/
│       └── PRD.md          ← YOU ARE HERE
├── frontend/               ← All React code lives here
├── backend/                ← All Node.js / Express code lives here
└── README.md
```

> **Agent Rule:** All frontend code goes inside `/frontend`. All backend code goes inside `/backend`. Never place frontend files in the backend folder or vice versa. Never create files at the root level except `README.md` and config files like `.gitignore`.

---

## Project Overview

| Field | Value |
|---|---|
| **Goal** | Build a mini Airbnb-style property listing app |
| **Time Limit** | 80 minutes |
| **Reference UI** | airbnb.co.in (visual inspiration only — do not copy code) |
| **Frontend Stack** | React (Vite) + React Router + TypeScript + Plain CSS / Tailwind / Styled Components |
| **Backend Stack** | Node.js + Express + TypeScript + REST APIs |
| **Database** | Any — MongoDB, MySQL, or SQLite |
| **Prohibited** | ❌ Firebase &nbsp; ❌ MUI / AntD / Chakra / Bootstrap or any UI component library |

### What Is Being Evaluated

| Skill | What Evaluators Look For |
|---|---|
| React Routing & Component Architecture | Clean route setup, direct URL access, no hacks |
| Search + Filter Logic | Combined AND logic, debounce, working filters |
| Responsive Design | Mobile-first, clean at 480px / 768px / 1024px |
| Speed & Decision Making | Right priorities under time pressure |
| UI Polish | Spacing, typography, alignment — no excuses |
| Code Quality | Readable, structured, no spaghetti |

---

## Execution Phases (A to Z)

Complete every phase in the exact order listed. Verify each checkpoint before proceeding.

---

### Phase 0 — Project Setup & Environment _(Est. 5 min)_

**Goal:** Running dev servers for both frontend and backend.

#### Steps

1. Create the root project folder:
   ```bash
   mkdir airbnb-clone && cd airbnb-clone
   ```

2. Scaffold the frontend inside `/frontend`:
   ```bash
   npm create vite@latest frontend -- --template react
   cd frontend && npm install
   ```

3. Install React Router in frontend:
   ```bash
   npm install react-router-dom
   ```

4. Install your CSS approach (pick **one**):
   ```bash
   # Tailwind
   npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p

   # Styled Components
   npm install styled-components

   # Plain CSS — no install needed
   ```

5. Scaffold the backend inside `/backend`:
   ```bash
   cd ../
   mkdir backend && cd backend && npm init -y
   npm install express cors dotenv
  npm install -D typescript ts-node-dev @types/node @types/express @types/cors
   ```

6. Install your DB driver (pick **one**):
   ```bash
   npm install mongoose          # MongoDB
   npm install better-sqlite3    # SQLite
   npm install mysql2            # MySQL
   ```

7. Verify both servers start:
   - Frontend on `http://localhost:5173`
   - Backend on `http://localhost:5000`

> ✅ **Checkpoint:** `npm run dev` (frontend) and `node index.js` (backend) both start without errors. No files exist outside `/frontend` or `/backend` except root config files.

---

### Phase 1 — Folder Structure & Architecture _(Est. 3 min)_

**Goal:** Establish structure before writing any feature code.

#### Frontend — `/frontend/src/`

```
frontend/
└── src/
    ├── components/       # Reusable UI — PropertyCard, SearchBar, FilterPanel, Navbar
    ├── pages/            # Route-level pages — HomePage, PropertyDetailPage, NotFoundPage
    ├── hooks/            # Custom hooks — useDebounce, useFetch
    ├── utils/            # Helpers — formatCurrency, buildQueryString, applyFilters
    ├── assets/           # Static images / icons
  ├── App.tsx           # Router setup
  └── main.tsx          # Entry point
```

#### Backend — `/backend/`

```
backend/
├── routes/              # Express route files — properties.ts
├── controllers/         # Business logic — propertiesController.ts
├── models/              # DB models / schema definitions
├── db/                  # DB connection + seed script — seed.ts
├── middleware/          # CORS, error handling
└── index.ts             # App entry point
```

> ✅ **Checkpoint:** All folders created. No feature code written yet — structure first.

---

### Phase 2 — Database: Schema & Seed Data _(Est. 8 min)_

**Goal:** DB running locally with at least 10 seeded properties.

#### 2.1 Schema — Every Property Must Have

| Field | Type | Constraints |
|---|---|---|
| `id` | Integer / ObjectId | Primary key, auto-generated |
| `title` | String | Property name, e.g. `Beachfront Villa` |
| `location` | String | City/area, e.g. `Goa, India` |
| `price` | Number | Price per night in INR (integer) |
| `rating` | Number (1–5) | One decimal place, e.g. `4.7` |
| `images` | Array of Strings | At least 3 image URLs per property |
| `description` | String | 50–200 words describing the property |

#### 2.2 Seed Script Requirements

- File: `backend/db/seed.ts`
- Insert exactly **10 properties** with diverse data:
  - At least **5 distinct cities** (e.g. Goa, Jaipur, Munnar, Manali, Mumbai)
  - Prices ranging from **₹1,500 to ₹25,000** per night
  - Ratings spread across 3.8, 4.0, 4.3, 4.5, 4.7, 4.8, 5.0
  - Real-looking Unsplash image URLs — no `placeholder.com`
- Run once: `npm run seed`

> ✅ **Checkpoint:** Query the DB directly. Confirm 10 rows/documents exist with all 7 fields populated.

---

### Phase 3 — Backend: REST API _(Est. 10 min)_

**Goal:** Two mandatory endpoints + one bonus endpoint returning correct JSON.

#### 3.1 Mandatory Endpoints

| Method | Route | Response | Notes |
|---|---|---|---|
| `GET` | `/api/properties` | Array of all property objects | Returns all fields |
| `GET` | `/api/properties/:id` | Single property object | Return `404` if not found |

#### 3.2 Bonus Endpoint (Strongly Recommended)

| Query Param | Behaviour |
|---|---|
| `search=` | Filter by `title` or `location` (case-insensitive LIKE / regex) |
| `minPrice=` / `maxPrice=` | Filter where `price >= minPrice AND price <= maxPrice` |
| `rating=` | Filter where `rating >= value` |
| All combined | Params stack with AND logic — not OR |

Full bonus URL example:
```
GET /api/properties?search=Goa&minPrice=2000&maxPrice=10000&rating=4
```

#### 3.3 Implementation Steps

1. Set up Express in `backend/index.js` with CORS enabled for `http://localhost:5173`
2. Create `backend/routes/properties.ts` with the routes above
3. Create `backend/controllers/propertiesController.ts` with DB query logic
4. Implement query-param parsing in the `GET /api/properties` handler
5. Return JSON with correct `Content-Type` headers
6. Return HTTP `404` with `{ "error": "Property not found" }` for a missing `:id`
7. Test all endpoints with `curl` or a REST client before proceeding

#### 3.4 Expected JSON Shape

```json
[
  {
    "id": 1,
    "title": "Beachfront Villa",
    "location": "Goa, India",
    "price": 4500,
    "rating": 4.7,
    "images": [
      "https://images.unsplash.com/...",
      "https://images.unsplash.com/...",
      "https://images.unsplash.com/..."
    ],
    "description": "A stunning beachfront villa with panoramic ocean views..."
  }
]
```

> ✅ **Checkpoint:** `curl http://localhost:5000/api/properties` → JSON array of 10 items. `curl http://localhost:5000/api/properties/9999` → `404 { "error": "Property not found" }`.

---

### Phase 4 — React Router Setup _(Est. 5 min)_

**Goal:** Two routes work including direct URL access — no 404 on hard refresh.

#### Steps

1. Wrap the app in `<BrowserRouter>` inside `frontend/src/main.tsx`
2. Define routes in `frontend/src/App.tsx`:
   ```jsx
   <Routes>
     <Route path="/"               element={<HomePage />} />
     <Route path="/property/:id"   element={<PropertyDetailPage />} />
     <Route path="*"               element={<NotFoundPage />} />
   </Routes>
   ```
3. Create placeholder components in `frontend/src/pages/` — just render an `<h1>` for now
4. Configure Vite for SPA fallback in `frontend/vite.config.ts`:
   ```js
   server: {
     historyApiFallback: true
   }
   ```
5. Test: navigate to `/property/1` directly in the browser — must not show a blank page or Vite 404

> ✅ **Checkpoint:** Navigating to `/` and `/property/1` both work. Hard refresh on `/property/1` does not break the app.

---

### Phase 5 — Home Page: Property Listing UI _(Est. 15 min)_

**Goal:** All properties fetched from the backend and displayed as cards in an Airbnb-inspired grid.

#### 5.1 Data Fetching

1. Use `fetch()` inside a `useEffect` to call `GET /api/properties` on mount
2. Store results in `useState` — `const [properties, setProperties] = useState([])`
3. Track a `isLoading` state — show a spinner or skeleton cards while fetching
4. Track an `isError` state — show a user-friendly message if the API call fails

#### 5.2 PropertyCard Component

File: `frontend/src/components/PropertyCard.tsx`

Each card **must** render:

| Element | Spec |
|---|---|
| Image | First item from `images[]`, `object-fit: cover`, `aspect-ratio: 4/3` |
| Title | Bold, truncated to 1 line with `text-overflow: ellipsis` |
| Location | Pin icon (emoji `📍` or SVG) prefixed |
| Price | Formatted as `₹4,500 / night` |
| Rating | Star icon + value, e.g. `★ 4.7` |
| Click Target | Entire card navigates to `/property/:id` via `<Link>` or `useNavigate` |

#### 5.3 Grid Layout

```css
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
```

| Breakpoint | Columns |
|---|---|
| Desktop ≥ 1024px | 3–4 columns |
| Tablet 768px | 2 columns |
| Mobile ≤ 480px | 1 column |

#### 5.4 Navbar / Header

- App logo / name on the left
- Search bar in the centre (wired up in Phase 6)
- Responsive — collapses gracefully on mobile

> ✅ **Checkpoint:** Homepage loads all properties from the API. Cards show image, title, location, price, and rating. Grid is responsive across breakpoints.

---

### Phase 6 — Search & Filter Logic _(Est. 12 min)_

**Goal:** Search and all filters work **together** with AND logic — not independently.

#### 6.1 Search

1. Controlled input stored in `useState` — `const [query, setQuery] = useState('')`
2. Implement debounce with a custom hook in `frontend/src/hooks/useDebounce.js`:
   ```js
   import { useState, useEffect } from 'react';

   export function useDebounce(value, delay = 300) {
     const [debounced, setDebounced] = useState(value);
     useEffect(() => {
       const timer = setTimeout(() => setDebounced(value), delay);
       return () => clearTimeout(timer);
     }, [value, delay]);
     return debounced;
   }
   ```
3. Apply the debounced query to filter `title` OR `location` (case-insensitive)

#### 6.2 Filters

**Price Range:**
- Two number inputs: `Min Price` and `Max Price`
- Filter: `price >= minPrice AND price <= maxPrice`
- If a field is empty, treat it as unbounded

**Rating Filter:**
- Options: `All` / `3+` / `4+` / `4.5+` / `5`
- Use radio buttons or segmented button group — no `<select>` dropdown
- Filter: `rating >= selectedThreshold`

#### 6.3 Combined Filter Logic

Place this in `frontend/src/utils/applyFilters.ts`:

```js
export function applyFilters(properties, { query, minPrice, maxPrice, minRating }) {
  return properties.filter(p => {
    const matchesSearch = !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase());

    const matchesMinPrice = !minPrice || p.price >= Number(minPrice);
    const matchesMaxPrice = !maxPrice || p.price <= Number(maxPrice);
    const matchesRating   = !minRating || p.rating >= Number(minRating);

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesRating;
  });
}
```

#### 6.4 UX Requirements

- Show **"No results found"** empty state when `filtered.length === 0`
- Show a **"Clear filters"** button whenever any filter is active
- Result count label: e.g. `Showing 4 of 10 properties`

> ✅ **Checkpoint:** Type `Goa` + set min rating `4.5` → only Goa properties with rating ≥ 4.5 shown. Clearing one filter updates results immediately. Debounce confirmed — results don't update on every keystroke.

---

### Phase 7 — Property Detail Page _(Est. 10 min)_

**Goal:** `/property/:id` loads the correct property including on hard refresh.

#### Steps

1. Read `:id` from the URL using `useParams()`
2. On mount, fetch `GET /api/properties/:id` — **do not** rely on data passed from HomePage state
3. While fetching: show a loading skeleton or spinner
4. On 404 error: show `"Property not found"` with a `← Back to Listings` link
5. On success, render the following layout:

| Section | Content Required |
|---|---|
| Image Gallery | Primary large image + thumbnail row. Clicking a thumbnail swaps the main image. |
| Title | `<h1>`, large font |
| Location | Pin icon + location string |
| Rating | `★` + numeric value |
| Price | Formatted per-night price + a `Book Now` button (UI only — no booking logic needed) |
| Description | Full description text, readable `line-height` |
| Back Link | `← Back to Listings` navigating to `/` |

> ✅ **Checkpoint:** Navigate to `/property/3`, hard-refresh → correct data loads. Thumbnail swap works. `/property/9999` shows the not-found state.

---

### Phase 8 — Responsiveness _(Est. 8 min)_

**Goal:** App is clean and fully usable at all three breakpoints.

Test each breakpoint using browser DevTools device emulation.

| Breakpoint | Required Behaviour |
|---|---|
| Mobile ≤ 480px | Single-column grid, search bar full width, filter panel collapsed/accordion, no horizontal scrollbar, text readable without zooming |
| Tablet 768px | Two-column grid, filter panel toggleable, compact navbar |
| Desktop ≥ 1024px | Three-column grid, filter sidebar visible, full-width header |

#### Required CSS Rules

```css
/* Grid — responsive by default */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* Never use fixed widths on containers */
/* ❌ width: 800px */
/* ✅ max-width: 1200px; width: 100%; */

/* Images */
img { width: 100%; height: auto; object-fit: cover; }

/* Breakpoints */
@media (max-width: 768px) { ... }
@media (max-width: 480px) { ... }
```

> ✅ **Checkpoint:** Resize browser from 320px to 1400px. No horizontal scroll at any width. Layout shifts correctly at each breakpoint.

---

### Phase 9 — UI Polish & Code Quality _(Est. 5 min)_

**Goal:** Clean, professional UI. Readable, structured code.

#### UI Polish Checklist

- [ ] Consistent spacing scale: `4px / 8px / 16px / 24px / 32px`
- [ ] Typography: at most 2 font sizes per component; clear visual hierarchy
- [ ] Colours: no more than 3 primary colours; sufficient contrast
- [ ] Hover states: cards and buttons have `cursor: pointer` + subtle hover effect
- [ ] No broken layouts with long titles or short descriptions
- [ ] No console errors or warnings

#### Code Quality Checklist

- [ ] No inline styles for structural layout — use CSS classes or styled components
- [ ] Components are small and single-purpose (aim for < 100 lines each)
- [ ] No magic numbers — use named CSS variables or JS constants
- [ ] No unused imports or dead code
- [ ] No `console.log` left in the codebase

> ✅ **Checkpoint:** Fresh `npm run dev`. No console errors. UI looks clean at all breakpoints.

---

### Phase 10 — Bonus Features _(If Time Permits)_

> Implement only if all mandatory phases are complete and time remains.

| Feature | Implementation Notes | Effort |
|---|---|---|
| Skeleton Loaders | Animated placeholder cards while data loads. Pure CSS animation. | Low |
| Error Boundary | React `ErrorBoundary` component wrapping routes. Shows fallback UI on JS errors. | Low |
| Backend Filtering | Move filter logic to `GET /api/properties?search=&minPrice=&maxPrice=&rating=` | Medium |
| Image Lightbox | Click main image → full-screen overlay with prev/next navigation | Medium |
| Favourites | Heart icon on cards. Toggle stores IDs in `useState`. No persistence needed. | Low |
| Clean Git History | Atomic commits: `feat: add property card`, `feat: add search filter`, etc. | Low |

---

### Phase 11 — Final Review & Submission _(Est. 5 min)_

**Goal:** Project runs cleanly from a fresh install. All requirements verified.

#### Pre-Submission Steps

1. Clean install both sides:
   ```bash
   cd frontend && rm -rf node_modules && npm install
   cd ../backend && rm -rf node_modules && npm install
   ```
2. Reseed the DB: `node backend/db/seed.js`
3. Start both servers fresh and visit `http://localhost:5173`
4. Run through the full checklist below

#### Final Verification Checklist

- [ ] Homepage loads and shows 10+ property cards from the API
- [ ] Each card shows image, title, location, price/night, and rating
- [ ] Search by location/name works with debounce (not on every keystroke)
- [ ] Price range filter works (min and max, unbounded when empty)
- [ ] Rating filter works (`3+`, `4+`, `4.5+`, etc.)
- [ ] Search + all filters work simultaneously (AND logic)
- [ ] Clicking a card navigates to `/property/:id`
- [ ] Hard refresh on `/property/:id` loads the correct property
- [ ] Detail page shows image gallery, title, location, price, rating, and description
- [ ] `GET /api/properties` returns `200` JSON array
- [ ] `GET /api/properties/:id` returns `200` for valid id, `404` for invalid
- [ ] Layout is correct and usable at 480px, 768px, and 1024px
- [ ] No UI library (MUI / AntD / etc.) imports anywhere in the codebase
- [ ] No Firebase imports anywhere in the codebase
- [ ] Browser console is completely error-free

5. If using GitHub: push all commits. Verify the repo is public or shared with the evaluator.

> ✅ **Checkpoint:** All 15 items ticked. Both servers start from a clean install. Ready for evaluation.

---

## Hard Rules & Constraints

> Violating any rule below results in **immediate disqualification** regardless of feature completion.

| Rule | Detail |
|---|---|
| ✅ TypeScript Everywhere | All frontend files must be `.ts` or `.tsx`; all backend files must be `.ts`. |
| ❌ No UI Component Libraries | MUI, AntD, Chakra, Shadcn, Bootstrap, etc. are all banned. Plain HTML + CSS only. |
| ❌ No Firebase | No Firebase Auth, Firestore, Realtime DB, or any Firebase SDK. |
| ❌ No Airbnb Source Code | The reference site is visual inspiration only. Do not copy markup or styles. |
| ❌ REST APIs Only | All data must come from your own Express API. No direct DB calls from the frontend. |
| ❌ Data From Backend | The homepage list must be fetched from the API — not imported from a local JSON file. |
| ✅ Google Allowed | Docs, MDN, Stack Overflow are permitted. Copying full feature implementations is not. |
| ✅ Readable Code | Evaluators will read your code. Spaghetti code is penalised. |

---

## Time Budget

| Phase | Activity | Est. Time | Priority |
|---|---|---|---|
| 0 | Project Setup & Environment | 5 min | Critical |
| 1 | Folder Structure | 3 min | Critical |
| 2 | Database Schema & Seed | 8 min | Critical |
| 3 | Backend REST API | 10 min | Critical |
| 4 | React Router Setup | 5 min | Critical |
| 5 | Home Page — Listing UI | 15 min | Critical |
| 6 | Search & Filter Logic | 12 min | Critical |
| 7 | Property Detail Page | 10 min | Critical |
| 8 | Responsiveness | 8 min | Critical |
| 9 | UI Polish & Code Quality | 5 min | High |
| 10 | Bonus Features | Variable | Optional |
| 11 | Final Review & Submission | 5 min | Critical |
| — | Buffer for debugging | ~4 min | Reserved |
| — | **TOTAL** | **80 min** | |

---

## Scoring Rubric

| Category | Max Marks | Key Criteria |
|---|---|---|
| Routing | 15 | Routes defined correctly, direct URL works, 404 route exists |
| Backend API | 20 | Both endpoints work, correct status codes, proper JSON |
| Property Listing UI | 15 | All card fields present, data from API, Airbnb-inspired layout |
| Search & Filter | 20 | Debounce implemented, combined AND logic, empty state shown |
| Property Detail Page | 15 | All fields shown, hard-refresh works, gallery functional |
| Responsiveness | 10 | Works at all three breakpoints, no horizontal overflow |
| Code Quality & Polish | 5 | Readable structure, no console errors, clean UI |
| Bonus Features | +10 | Up to 2 marks per bonus feature implemented |

---

## Common Failure Modes to Avoid

| Anti-Pattern | Consequence | Fix |
|---|---|---|
| Hardcoding property data in frontend | Fails backend requirement | Always fetch from `GET /api/properties` |
| Routing breaks on hard refresh | Fails routing requirement | Configure `historyApiFallback: true` in Vite |
| Search and filters work independently | Partial credit only | Combine all into a single `applyFilters()` function |
| Fixed-width containers (`width: 800px`) | Fails mobile breakpoint | Use `max-width` + `%` or `fr` units |
| Importing MUI or AntD even partially | **Disqualification** | Use plain HTML elements only |
| Missing loading and error states | UX fail, loses polish marks | Add `isLoading` and `isError` to every fetch |
| `console.log` left in code | Code quality deduction | Remove all debug logs before submission |
| No debounce on search | Fails debounce requirement | Use `useDebounce` hook |
| Detail page only works via navigation | Fails hard-refresh test | Fetch by ID from `useParams` on component mount |
| Files placed outside `/frontend` or `/backend` | Structure violation | Respect the folder contract strictly |

---

## API Contract Quick Reference

### GET /api/properties

```
GET /api/properties
GET /api/properties?search=Goa&minPrice=2000&maxPrice=10000&rating=4
```

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Beachfront Villa",
    "location": "Goa, India",
    "price": 4500,
    "rating": 4.7,
    "images": ["https://...", "https://...", "https://..."],
    "description": "A stunning villa with panoramic ocean views..."
  }
]
```

### GET /api/properties/:id

```
GET /api/properties/1
```

**Response 200:** Single property object (same shape as above)

**Response 404:**
```json
{ "error": "Property not found" }
```

---

*PRD v1.0 — Mini Airbnb Property Listing App — Interview Assessment — 80 Minutes*
