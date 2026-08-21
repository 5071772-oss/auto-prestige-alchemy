# Plan: Inventory Page with Backend Sync

Create a new page to display cars "in stock" and connect it to the database. The user will manage this data via Google Sheets, which will sync to the backend.

## User Requirements
- A separate page (`/stock`) for cars currently available.
- "Garage" items and "Order similar" buttons link to this page.
- Data is loaded from the backend (Supabase `cars` table).
- Recommendations for Alex on image formats for global reliability.

## Proposed Changes

### 1. Database & Backend
- Ensure the `cars` table exists with fields: `id`, `brand`, `model`, `spec`, `image_url`, `description`, `price` (optional), `created_at`.
- Enable RLS on the `cars` table and grant SELECT access to authenticated/anon users.

### 2. Frontend Development
- **New Page**: `src/pages/Stock.tsx`
  - Premium design consistent with the landing page.
  - Fetch car data using React Query and the Supabase client.
  - Responsive grid layout for car cards.
- **Routing**: Update `src/App.tsx` to include the `/stock` route.
- **Navigation**:
  - Update `Nav` component in `src/pages/Index.tsx` to link to the new page.
  - Update `Gallery` and `Hero` section links/buttons to navigate to `/stock`.

### 3. Google Sheets Integration (Instructional)
- Provide Alex with the structure for his Google Sheet to ensure compatibility with the sync.
- Advise on image hosting (e.g., using direct links from a CDN or specialized car photo services).

## Technical Details
- **Stack**: React, Tailwind CSS, Lucide Icons, Framer Motion (or existing Reveal component).
- **Data Fetching**: `@tanstack/react-query` for efficient caching and loading states.
- **Backend**: Supabase `cars` table.

## Image Format Recommendations for Alex
To ensure images load globally and reliably from Google Sheets:
1. **Direct Links**: Use links that point directly to the image file (ending in `.jpg`, `.png`, `.webp`).
2. **Hosting**: Use a reliable CDN or public hosting like Imgur, PostImages, or dedicated automotive photo services. Avoid raw Google Drive links (they often require a "direct link generator").
3. **Optimization**: Prefer `.webp` or compressed `.jpg` for faster loading.
