GRANT ALL ON public.cars TO authenticated;
GRANT ALL ON public.sync_logs TO authenticated;
GRANT ALL ON public.cars TO service_role;
GRANT ALL ON public.sync_logs TO service_role;
GRANT SELECT ON public.cars TO anon;
