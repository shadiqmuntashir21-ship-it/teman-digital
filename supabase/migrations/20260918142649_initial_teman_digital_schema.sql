-- Source-of-truth migration for the Teman Digital project.
-- This schema was applied to Supabase project souakvmuoygvsugxmpwd.

create schema if not exists private;

create table if not exists private.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

revoke all on schema private from public;
revoke all on private.admin_users from public;
grant usage on schema private to authenticated;
grant select on private.admin_users to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from private.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public;
revoke all on function private.is_admin() from anon;
grant execute on function private.is_admin() to authenticated;

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  eyebrow text,
  short_description text not null,
  description text,
  features text[] not null default '{}',
  starting_price text,
  icon text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pricing_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  price_label text not null,
  features text[] not null default '{}',
  cta_label text not null default 'Mulai Project',
  featured boolean not null default false,
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  description text,
  challenge text,
  solution text,
  year integer,
  technologies text[] not null default '{}',
  cover_url text,
  preview_url text,
  repository_url text,
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  role text,
  quote text not null,
  avatar_url text,
  project_id uuid references public.portfolio_projects(id) on delete set null,
  published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text,
  phone text not null,
  service text not null,
  goal text,
  features text[] not null default '{}',
  design_style text,
  timeline text,
  budget text,
  notes text,
  status text not null default 'new'
    check (status in ('new','contacted','discussion','proposal','accepted','rejected','archived')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id smallint primary key default 1 check (id = 1),
  brand_name text not null default 'Teman Digital',
  hero_eyebrow text not null default 'DESIGN • DEVELOPMENT • DIGITAL EXPERIENCE',
  hero_title text not null default 'Ide bagus pantas punya pengalaman digital yang bagus.',
  hero_description text not null default 'Website, landing page, dashboard, dan aplikasi web yang dirancang untuk terlihat menarik, bekerja cepat, dan membantu bisnis berkembang.',
  whatsapp text,
  email text,
  instagram_url text,
  linkedin_url text,
  github_url text,
  updated_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.pricing_packages enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.leads enable row level security;
alter table public.site_settings enable row level security;

grant select on public.services, public.pricing_packages, public.portfolio_projects, public.testimonials, public.site_settings to anon, authenticated;
grant insert on public.leads to anon, authenticated;
grant select, insert, update, delete on public.services, public.pricing_packages, public.portfolio_projects, public.testimonials, public.leads, public.site_settings to authenticated;

create policy "public_read_active_services" on public.services for select to anon, authenticated using (active = true or private.is_admin());
create policy "admin_manage_services" on public.services for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "public_read_active_pricing" on public.pricing_packages for select to anon, authenticated using (active = true or private.is_admin());
create policy "admin_manage_pricing" on public.pricing_packages for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "public_read_published_projects" on public.portfolio_projects for select to anon, authenticated using (published = true or private.is_admin());
create policy "admin_manage_projects" on public.portfolio_projects for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "public_read_published_testimonials" on public.testimonials for select to anon, authenticated using (published = true or private.is_admin());
create policy "admin_manage_testimonials" on public.testimonials for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy "public_submit_leads" on public.leads for insert to anon, authenticated
with check (
  char_length(trim(name)) between 2 and 120
  and char_length(trim(phone)) between 6 and 40
  and char_length(trim(service)) between 2 and 80
  and status = 'new'
  and source = 'website'
);

create policy "admin_manage_leads" on public.leads for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "public_read_settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admin_manage_settings" on public.site_settings for all to authenticated using (private.is_admin()) with check (private.is_admin());

create index if not exists portfolio_projects_published_order_idx on public.portfolio_projects (published, featured desc, display_order, created_at desc);
create index if not exists leads_status_created_at_idx on public.leads (status, created_at desc);
create index if not exists services_active_order_idx on public.services (active, display_order);
create index if not exists pricing_active_order_idx on public.pricing_packages (active, display_order);
create index if not exists testimonials_project_id_idx on public.testimonials(project_id);
