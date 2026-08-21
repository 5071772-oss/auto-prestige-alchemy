
create table if not exists public.cars (
    id uuid primary key default gen_random_uuid(),
    make text not null,
    model text not null,
    year integer,
    price_cash text,
    price_vat text,
    specs text,
    mileage integer,
    description text,
    images text[],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Grant access to public.cars
grant select, insert, update, delete on public.cars to authenticated;
grant select on public.cars to anon;
grant all on public.cars to service_role;

-- Enable RLS
alter table public.cars enable row level security;

-- Policies
create policy "Public read access"
on public.cars for select
to public
using (true);

create policy "Authenticated all access"
on public.cars for all
to authenticated
using (true)
with check (true);
