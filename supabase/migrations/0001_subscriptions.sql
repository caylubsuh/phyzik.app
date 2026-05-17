-- PHYZIK web subscriptions
--
-- Tracks Stripe-managed subscriptions purchased on the website (not via Apple StoreKit).
-- The iOS app reads from this table to determine whether the signed-in user has an
-- active web sub, alongside (or instead of) its StoreKit entitlement check.
--
-- Apply manually in Supabase Dashboard -> SQL Editor, or via the Supabase CLI:
--   supabase db push
--
-- ⚠️  FOR SQL EDITOR — REVIEW BEFORE RUNNING IN PRODUCTION.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,

  stripe_customer_id text,
  stripe_subscription_id text unique,
  price_id text not null,

  status text not null check (status in (
    'incomplete',
    'incomplete_expired',
    'trialing',
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'paused'
  )),

  plan text not null check (plan in ('monthly', 'annual')),

  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  trial_end timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx
  on public.subscriptions (user_id);

create index if not exists subscriptions_status_idx
  on public.subscriptions (status);

create index if not exists subscriptions_stripe_customer_idx
  on public.subscriptions (stripe_customer_id);

-- ---------------------------------------------------------------------------
-- Auto-update updated_at on row change
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row-Level Security
--
-- Users can SELECT their own row; everything else is written by the
-- Stripe webhook handler using the service-role key (which bypasses RLS).
-- ---------------------------------------------------------------------------
alter table public.subscriptions enable row level security;

drop policy if exists "Users can read their own subscription"
  on public.subscriptions;

create policy "Users can read their own subscription"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

-- No insert / update / delete policy = blocked for anon and authed clients.

-- ---------------------------------------------------------------------------
-- Helper RPC the iOS app can call to check web entitlement.
--
-- Returns the latest active period_end the user is entitled to, or null.
-- Treats 'active' and 'trialing' as entitled.
-- ---------------------------------------------------------------------------
create or replace function public.web_subscription_active_until()
returns timestamptz
language sql
security invoker
stable
as $$
  select max(current_period_end)
  from public.subscriptions
  where user_id = auth.uid()
    and status in ('active', 'trialing')
    and (current_period_end is null or current_period_end > now());
$$;

-- Convenience view: current user's active web sub row (or empty).
create or replace view public.my_active_subscription
with (security_invoker = true) as
select *
from public.subscriptions
where user_id = auth.uid()
  and status in ('active', 'trialing', 'past_due');
