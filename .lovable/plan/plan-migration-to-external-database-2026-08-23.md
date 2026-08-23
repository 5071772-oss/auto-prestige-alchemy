# Plan: Migration to External Database

The user wants to switch the project from the current Lovable Cloud database (`bjhldgvzmbgskwxjyqog`) to an external PostgreSQL database. Since the current project relies on Lovable Cloud features (Auth, Edge Functions, RLS via Supabase Client), I will guide the user on how to properly connect an external database while explaining the trade-offs.

## User Review Required

> [!IMPORTANT]
> Switching to an external database (`db-team-cmrs0cdyj00e6o301lwrvch2o`) means moving away from the integrated Lovable Cloud. This will impact:
> 1. **Authentication**: The current managed Google/Email login is tied to the current project.
> 2. **Edge Functions**: The Google Sheets sync currently runs on Lovable Cloud infrastructure.
> 3. **Real-time & Storage**: These features are managed by the current Supabase instance.
>
> To proceed, we should connect this external database as a **Custom Supabase Connection** in the project settings.

## Proposed Changes

### Database Integration
- Connect the external database `postgresql://u_cmt4dr7l80:Bu8WUGguQQogtbjz2aoOD8aKA0euSCs@db-team-cmrs0cdyj00e6o301lwrvch2o:5432/db_auto_prestige_alchemy` to the project.
- This requires the user to use the **"Connect Supabase"** option in the Lovable dashboard (if it's a Supabase-compatible instance) or to update the environment variables.

### Code & Environment
- Update `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to point to the new project.
- If it's a raw PostgreSQL database (not Supabase), the `src/integrations/supabase/client.ts` will no longer work, and we would need to implement a different data fetching layer (which is not recommended for client-side apps due to security).

## Technical Details
- **Environment Variables**: The project currently uses `bjhldgvzmbgskwxjyqog`. I will prepare the code to be flexible for the new project ID.
- **Schema Migration**: The `cars` table and RLS policies will need to be recreated on the new database.

## Next Steps
1. The user needs to confirm if the new database is a **Supabase project**.
2. If yes, I will provide the steps to link the new project ID in Lovable settings.
3. If no, we must discuss how to handle data security, as raw DB strings should not be used directly in the frontend.
