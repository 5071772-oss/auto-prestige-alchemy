# Plan: Google Sheets Integration for Car Stock

We will implement a dynamic inventory system where car data is managed in a Google Sheet and automatically displayed on the "В наличии" page.

## User Review Required

> [!IMPORTANT]
> To connect Google Sheets, I will need you to **publish your Google Sheet to the web as a CSV** once it's ready. This allows the app to read the data without complex OAuth flows. I will provide the exact steps after the initial setup.

## Technical Details

### 1. Database Schema
Create a `cars` table in the backend to store and cache the inventory:
- `id`: UUID (Primary Key)
- `brand`: Text (e.g., BMW)
- `model`: Text (e.g., X5 M)
- `year`: Integer (e.g., 2024)
- `price`: Text (e.g., 15 500 000 ₽)
- `mileage`: Text (e.g., 500 км)
- `image_url`: Text (Direct link to photo)
- `description`: Text (Short specs)

### 2. Frontend Implementation
- Modify `src/pages/Stock.tsx` to fetch data from the database.
- Create a premium car card component with animations.
- Implement a fallback "Sync" mechanism that reads the Google Sheet CSV and updates the database.

### 3. Google Sheets Structure
I will provide a template link or structure:
- Column A: Brand
- Column B: Model
- Column C: Year
- Column D: Price
- Column E: Mileage
- Column F: Image URL
- Column G: Description

## Steps

1. **Database**: Run migration to create the `cars` table with RLS policies (Public Read).
2. **Data Sync**: Create a utility to fetch and parse the Google Sheet CSV.
3. **UI Update**: Replace the "Coming Soon" placeholder in `src/pages/Stock.tsx` with a dynamic grid of car cards.
4. **Integration**: Add a small hidden or admin-only trigger to refresh data from the sheet.
