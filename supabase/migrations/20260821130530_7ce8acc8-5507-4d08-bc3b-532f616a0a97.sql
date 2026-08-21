
-- Fix security linter warnings: revoke EXECUTE on public schema functions from public roles
-- and move the internal trigger function to a private schema if possible, 
-- or at least restrict access.

-- For simplicity in this environment, we just revoke the execution rights from anon/authenticated.
REVOKE EXECUTE ON FUNCTION public.trigger_stock_sync() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trigger_stock_sync() FROM anon;
REVOKE EXECUTE ON FUNCTION public.trigger_stock_sync() FROM authenticated;

-- Only service_role (and superusers/owners) can execute it
GRANT EXECUTE ON FUNCTION public.trigger_stock_sync() TO service_role;
