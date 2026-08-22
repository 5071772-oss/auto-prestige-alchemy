import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { spreadsheetId } = await req.json()
    
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")
    const googleSheetsKey = Deno.env.get("GOOGLE_SHEETS_API_KEY_1")

    if (!lovableApiKey || !googleSheetsKey) {
      throw new Error("Missing connector credentials")
    }

    // Fetch data from Google Sheets via Gateway
    const response = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${spreadsheetId}/values/Stock!A:U`,
      {
        headers: {
          "Authorization": `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": googleSheetsKey,
        },
      }
    )

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Google Sheets API error: ${errText}`)
    }

    const sheetData = await response.json()
    const rows = sheetData.values

    if (!rows || rows.length <= 1) {
      return new Response(JSON.stringify({ success: true, count: 0, message: "No data found" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const header = rows[0]
    const dataRows = rows.slice(1)

    const carsToInsert = dataRows
      .filter(row => row[0] && row[1]) // make and model
      .map(row => {
        const images = row.slice(8, 20).filter(url => url && url.startsWith("http"))
        return {
          make: row[0],
          model: row[1],
          year: parseInt(row[2]) || null,
          price_cash: row[3],
          price_vat: row[4],
          mileage: parseInt(row[5]?.toString().replace(/\D/g, '')) || null,
          specs: row[6],
          description: row[7],
          status: row[20] || 'available',
          images: images
        }
      })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Clear and insert
    await supabase.from("cars").delete().neq("make", "SKIP_ALL_DELETE")
    const { error: insertError } = await supabase.from("cars").insert(carsToInsert)
    
    if (insertError) throw insertError

    return new Response(JSON.stringify({ success: true, count: carsToInsert.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
