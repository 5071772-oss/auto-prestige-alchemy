
-- 1. Create cars table
CREATE TABLE public.cars (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    brand text NOT NULL,
    model text NOT NULL,
    spec text NOT NULL,
    image_url text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

-- 2. Grant permissions
GRANT SELECT ON public.cars TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cars TO authenticated;
GRANT ALL ON public.cars TO service_role;

-- 3. Enable RLS
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- 4. Policies
CREATE POLICY "Allow public read access" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access" ON public.cars FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
