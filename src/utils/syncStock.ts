import { supabase } from "@/integrations/supabase/client";

/**
 * Syncs car inventory from a Google Sheet CSV export.
 * Expected structure:
 * A: Brand, B: Model, C: Year, D: Price Cash, E: Price VAT, F: Specs, G: Mileage, H: Description, I-T: Images
 */
export async function syncCarsFromGoogleSheet(csvUrl: string) {
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("Failed to fetch Google Sheet CSV");
    
    const text = await response.text();
    const rows = text.split("\n").map(row => row.split(",").map(cell => cell.trim().replace(/^"|"$/g, '')));
    
    // Skip header row
    const dataRows = rows.slice(1);
    
    const carsToInsert = dataRows
      .filter(row => row[0] && row[1]) // Must have brand and model
      .map(row => {
        const images = row.slice(8, 20).filter(url => url && url.startsWith("http"));
        return {
          brand: row[0],
          model: row[1],
          year: parseInt(row[2]) || null,
          price_cash: row[3],
          price_vat: row[4],
          specs: row[5],
          mileage: row[6],
          description: row[7],
          images: images
        };
      });

    if (carsToInsert.length === 0) return { success: true, count: 0 };

    // Clear existing cars
    const { error: deleteError } = await supabase.from("cars").delete().neq("brand", "SKIP_ALL_DELETE");
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase.from("cars").insert(carsToInsert);
    if (insertError) throw insertError;

    return { success: true, count: carsToInsert.length };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, error };
  }
}
