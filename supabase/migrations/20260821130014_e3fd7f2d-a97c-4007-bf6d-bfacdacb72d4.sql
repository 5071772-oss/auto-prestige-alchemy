alter table public.cars rename column brand to make;
alter table public.cars drop column spec;
alter table public.cars drop column image_url;

alter table public.cars add column year integer;
alter table public.cars add column price numeric;
alter table public.cars add column mileage integer;
alter table public.cars add column engine_type text;
alter table public.cars add column power integer;
alter table public.cars add column color text;
alter table public.cars add column status text default 'available';
alter table public.cars add column images text[];

grant select on public.cars to anon;
grant select, insert, update, delete on public.cars to authenticated;
grant all on public.cars to service_role;

alter table public.cars enable row level security;

-- Drop existing policies if they exist (they might not have the right names)
drop policy if exists "Anyone can read cars" on public.cars;
drop policy if exists "Authenticated users can manage cars" on public.cars;

create policy "Anyone can read cars"
on public.cars for select
using (true);

create policy "Authenticated users can manage cars"
on public.cars for all
to authenticated
using (true)
with check (true);