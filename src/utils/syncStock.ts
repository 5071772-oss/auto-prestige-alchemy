import { supabase } from "@/integrations/supabase/client";

/**
 * Syncs car inventory from a Google Sheet CSV export.
 * Expected structure (comma separated):
 * A: Brand/Make, B: Model, C: Year, D: Price Cash, E: Price VAT, F: Specs, G: Mileage, H: Description, I-T: Images
 * 
 * NOTE: This parser uses a robust CSV splitting regex to handle quoted cells with commas.
 */
export async function syncCarsFromGoogleSheet(csvUrl: string) {
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error("Failed to fetch Google Sheet CSV");
    
    const text = await response.text();
    
    // Robust CSV parsing regex to handle quoted values containing commas
    const rows = text.split(/\r?\n/).filter(line => line.trim().length > 0).map(line => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    });
    
    // Skip header row
    const dataRows = rows.slice(1);
    
    const carsToInsert = dataRows
      .filter(row => row[0] && row[1]) // Must have make and model
      .map(row => {
        // Images are in columns I through T (indices 8 to 19)
        const images = row.slice(8, 20).filter(url => url && url.startsWith("http"));
        
        return {
          make: row[0],
          model: row[1],
          year: parseInt(row[2]) || null,
          price_cash: row[3],
          price_vat: row[4],
          specs: row[5],
          mileage: parseInt(row[6]?.toString().replace(/\D/g, '')) || null,
          description: row[7],
          images: images
        };
      });

    if (carsToInsert.length === 0) return { success: true, count: 0 };

    // Clear existing cars
    const { error: deleteError } = await supabase.from("cars").delete().neq("make", "SKIP_ALL_DELETE");
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase.from("cars").insert(carsToInsert);
    if (insertError) throw insertError;

    return { success: true, count: carsToInsert.length };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, error };
  }
}
