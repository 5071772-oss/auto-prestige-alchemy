
-- 1. Create a function to be called by the scheduler
CREATE OR REPLACE FUNCTION public.trigger_stock_sync()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function records the intent to sync in a log table.
  INSERT INTO public.sync_logs (status, message)
  VALUES ('scheduled', 'Auto-sync triggered by database scheduler');
END;
$$;

-- 2. Create a logs table to track sync history
CREATE TABLE IF NOT EXISTS public.sync_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    status text NOT NULL,
    message text
);

GRANT SELECT, INSERT ON public.sync_logs TO authenticated;
GRANT ALL ON public.sync_logs TO service_role;

ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view logs"
ON public.sync_logs FOR SELECT
TO authenticated
USING (true);
