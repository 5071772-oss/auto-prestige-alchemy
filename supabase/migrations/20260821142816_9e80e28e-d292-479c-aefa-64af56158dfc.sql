
-- The 'cars' table exists but might have incorrect columns from a previous attempt.
-- Let's ensure it has exactly what we need.

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'price_cash') THEN
        ALTER TABLE public.cars ADD COLUMN price_cash TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'price_vat') THEN
        ALTER TABLE public.cars ADD COLUMN price_vat TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'specs') THEN
        ALTER TABLE public.cars ADD COLUMN specs TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cars' AND column_name = 'images') THEN
        ALTER TABLE public.cars ADD COLUMN images TEXT[] DEFAULT '{}';
    END IF;
    
    -- Cleanup old columns if they exist and are not needed (optional, but keep it safe)
    -- ALTER TABLE public.cars DROP COLUMN IF EXISTS price; 
END $$;

-- Ensure grants are correct even if table existed
GRANT SELECT ON public.cars TO anon, authenticated;
GRANT ALL ON public.cars TO service_role;

-- Ensure RLS is enabled
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure they match our needs
DROP POLICY IF EXISTS "Public cars are viewable by everyone" ON public.cars;
CREATE POLICY "Public cars are viewable by everyone" 
ON public.cars FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Service role can do everything" ON public.cars;
CREATE POLICY "Service role can do everything"
ON public.cars FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
