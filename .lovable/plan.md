# Plan: Google Sheets Integration for Car Stock

We will implement a dynamic inventory system where car data is managed in a Google Sheet and automatically displayed on the "В наличии" page with support for multiple prices, specs, and image galleries.

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
- `price_cash`: Text (Price for cash)
- `price_vat`: Text (Price including VAT)
- `specs`: Text (Configuration/Equipment)
- `mileage`: Text (e.g., 500 км)
- `description`: Text (Short specs)
- `images`: Text[] (Array of image URLs, supporting 6-12 photos)

### 2. Frontend Implementation
- Modify `src/pages/Stock.tsx` to fetch data from the database.
- Create a premium car card component with a **photo carousel** to flip through images.
- Display both "Cash" and "VAT" prices clearly.
- Implement a fallback "Sync" mechanism that reads the Google Sheet CSV and updates the database.

### 3. Google Sheets Structure (Revised)
- Column A: Brand
- Column B: Model
- Column C: Year
- Column D: Price Cash
- Column E: Price VAT
- Column F: Specs (Equipment)
- Column G: Mileage
- Column H: Description
- Columns I-T: Image URLs (Image 1, Image 2, ..., Image 12)

## Steps

1. **Database**: Create the `cars` table via backend tool with updated columns and RLS policies.
2. **Data Sync**: Create a utility to fetch and parse the Google Sheet CSV, mapping columns I-T into an images array.
3. **UI Update**: Build the `CarCard` component in `src/pages/Stock.tsx` with a Swiper-like image slider.
4. **Integration**: Setup the automated/manual refresh from the sheet.
