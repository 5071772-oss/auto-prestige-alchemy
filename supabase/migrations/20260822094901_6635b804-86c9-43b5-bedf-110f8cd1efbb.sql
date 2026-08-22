DROP POLICY IF EXISTS "Allow authenticated full access" ON public.cars;
DROP POLICY IF EXISTS "Allow public read access" ON public.cars;
DROP POLICY IF EXISTS "Anyone can read cars" ON public.cars;
DROP POLICY IF EXISTS "Anyone can view cars" ON public.cars;
DROP POLICY IF EXISTS "Authenticated all access" ON public.cars;
DROP POLICY IF EXISTS "Authenticated users can manage cars" ON public.cars;
DROP POLICY IF EXISTS "Public cars are viewable by everyone" ON public.cars;
DROP POLICY IF EXISTS "Public read access" ON public.cars;
DROP POLICY IF EXISTS "Service role can do everything" ON public.cars;

REVOKE INSERT, UPDATE, DELETE ON public.cars FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.cars FROM anon;
GRANT SELECT ON public.cars TO anon, authenticated;
GRANT ALL ON public.cars TO service_role;

ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cars are publicly viewable"
ON public.cars FOR SELECT
USING (true);

CREATE POLICY "Service role manages cars"
ON public.cars FOR ALL
TO service_role
USING (true) WITH CHECK (true);