
-- Create the cars table if it doesn't exist (it seems it does from types.ts, but let's be sure)
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    spec TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure correct permissions
GRANT SELECT ON public.cars TO authenticated;
GRANT SELECT ON public.cars TO anon;
GRANT ALL ON public.cars TO service_role;

-- Enable RLS
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read car data
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'cars' AND policyname = 'Anyone can view cars'
    ) THEN
        CREATE POLICY "Anyone can view cars" ON public.cars FOR SELECT USING (true);
    END IF;
END
$$;
