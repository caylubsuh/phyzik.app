-- Expand public.subscriptions.plan to support the two-tier scheme.
--
-- Web pricing went from single-tier (monthly / annual) to two-tier
-- (Pro / Pro Max), so the legacy CHECK constraint must be replaced and any
-- existing rows migrated to the new naming.
--
-- New plan values mirror the iOS Edge Function's PRODUCT_TIER_MAP so a single
-- normalized tier string survives across StoreKit + Stripe + Supabase.
--
-- Apply manually in Supabase Dashboard -> SQL Editor:
--
-- ⚠️  FOR SQL EDITOR — REVIEW BEFORE RUNNING IN PRODUCTION.

-- 1. Drop the legacy CHECK constraint.
alter table public.subscriptions
  drop constraint if exists subscriptions_plan_check;

-- 2. Migrate existing rows. Anyone previously on 'monthly' / 'annual' is
--    grandfathered onto the Pro tier (same feature set they signed up for).
update public.subscriptions
set plan = case
  when plan = 'monthly' then 'pro_monthly'
  when plan = 'annual'  then 'pro_annual'
  else plan
end
where plan in ('monthly', 'annual');

-- 3. Reapply the CHECK with all four valid plan values.
alter table public.subscriptions
  add constraint subscriptions_plan_check
  check (plan in (
    'pro_monthly',
    'pro_annual',
    'pro_max_monthly',
    'pro_max_annual'
  ));

-- ---------------------------------------------------------------------------
-- Convenience: tier helper view. Lets the iOS app read a single 'tier' column
-- ('pro' | 'pro_max' | 'free') rather than re-deriving from plan string.
-- ---------------------------------------------------------------------------
create or replace view public.my_web_tier
with (security_invoker = true) as
select
  s.user_id,
  case
    when s.status in ('active', 'trialing') and (s.plan = 'pro_max_monthly' or s.plan = 'pro_max_annual')
      then 'pro_max'
    when s.status in ('active', 'trialing')
      then 'pro'
    else 'free'
  end as tier,
  s.plan,
  s.status,
  s.current_period_end
from public.subscriptions s
where s.user_id = auth.uid()
order by s.created_at desc
limit 1;
