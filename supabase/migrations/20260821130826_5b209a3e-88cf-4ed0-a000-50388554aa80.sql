
-- Ensure the sync_logs table exists and is accessible
CREATE TABLE IF NOT EXISTS public.sync_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    status text NOT NULL,
    message text
);

GRANT SELECT, INSERT ON public.sync_logs TO authenticated;
GRANT ALL ON public.sync_logs TO service_role;

ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view logs" ON public.sync_logs;
CREATE POLICY "Admins can view logs"
ON public.sync_logs FOR SELECT
TO authenticated
USING (true);
