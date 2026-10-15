-- ============================================================================
-- UNIVA · Migración 0001 · Fundación (Fase 1)
-- Perfiles, roles, ciudades y auditoría, con RLS desde el primer día.
-- Principio: los roles NUNCA se escriben desde el navegador.
-- ============================================================================

create extension if not exists postgis with schema extensions;

-- ── Tipos ────────────────────────────────────────────────────────────────────
create type public.app_role as enum ('passenger', 'driver', 'admin', 'support');

-- ── Utilidades ───────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── profiles: datos personales básicos (privados) ────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  full_name     text not null check (char_length(full_name) between 2 and 120),
  phone         text check (phone ~ '^[0-9]{10}$'),
  -- Preferencia declarada al registrarse. NO otorga ningún permiso.
  signup_intent text not null default 'passenger' check (signup_intent in ('passenger', 'driver')),
  avatar_path   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ── user_roles: fuente de verdad de los permisos ─────────────────────────────
create table public.user_roles (
  user_id    uuid not null references auth.users (id) on delete cascade,
  role       public.app_role not null,
  granted_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create index user_roles_role_idx on public.user_roles (role);

-- Comprueba un rol sin exponer la tabla (security definer, search_path fijo).
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = _user_id and ur.role = _role
  );
$$;

revoke all on function public.has_role(uuid, public.app_role) from public;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

-- ── cities: ciudades de operación ────────────────────────────────────────────
create table public.cities (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 2 and 80),
  state      text not null check (char_length(state) between 2 and 80),
  timezone   text not null default 'America/Mexico_City',
  is_active  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, state)
);

create trigger cities_set_updated_at
  before update on public.cities
  for each row execute function public.set_updated_at();

-- ── audit_logs: acciones sensibles (solo escritura desde el servidor) ────────
create table public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users (id) on delete set null,
  action      text not null,
  entity_type text not null,
  entity_id   text,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index audit_logs_actor_idx on public.audit_logs (actor_id);

-- ── Alta automática de perfil y rol base al registrarse ──────────────────────
-- Lee solo datos de perfil de los metadatos; sanea todo y NUNCA falla el registro
-- por un dato inválido. El rol inicial es siempre 'passenger'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta        jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_name      text  := nullif(btrim(coalesce(meta ->> 'full_name', '')), '');
  v_phone     text  := regexp_replace(coalesce(meta ->> 'phone', ''), '\D', '', 'g');
  v_intent    text  := coalesce(meta ->> 'signup_intent', 'passenger');
begin
  if v_name is null or char_length(v_name) < 2 then
    v_name := split_part(coalesce(new.email, 'usuario'), '@', 1);
  end if;
  if char_length(v_name) < 2 then
    v_name := 'Usuario';
  end if;
  v_name := left(v_name, 120);

  if v_phone !~ '^[0-9]{10}$' then
    v_phone := null;
  end if;

  if v_intent not in ('passenger', 'driver') then
    v_intent := 'passenger';
  end if;

  insert into public.profiles (id, full_name, phone, signup_intent)
  values (new.id, v_name, v_phone, v_intent);

  insert into public.user_roles (user_id, role)
  values (new.id, 'passenger');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles   enable row level security;
alter table public.user_roles enable row level security;
alter table public.cities     enable row level security;
alter table public.audit_logs enable row level security;

-- Permisos de tabla explícitos (RLS filtra filas; los GRANT limitan operaciones).
revoke all on public.profiles, public.user_roles, public.cities, public.audit_logs
  from anon, authenticated;

grant select, update on public.profiles   to authenticated;
grant select         on public.user_roles to authenticated;
grant select         on public.cities     to anon, authenticated;
grant insert, update on public.cities     to authenticated;
grant select         on public.audit_logs to authenticated;

-- profiles: cada usuario ve y edita solo el suyo; el administrador puede leer.
create policy profiles_select_own on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

create policy profiles_select_admin on public.profiles
  for select to authenticated
  using (public.has_role((select auth.uid()), 'admin'));

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));
-- Sin políticas de INSERT/DELETE: el alta la hace el trigger; el borrado, el servidor.

-- user_roles: lectura propia o de administrador. Nadie escribe desde el cliente;
-- los cambios de rol los hace el servidor con service_role y quedan en audit_logs.
create policy user_roles_select_own on public.user_roles
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy user_roles_select_admin on public.user_roles
  for select to authenticated
  using (public.has_role((select auth.uid()), 'admin'));

-- cities: las activas son públicas; el administrador gestiona todas.
create policy cities_select_active on public.cities
  for select to anon, authenticated
  using (is_active);

create policy cities_select_admin on public.cities
  for select to authenticated
  using (public.has_role((select auth.uid()), 'admin'));

create policy cities_insert_admin on public.cities
  for insert to authenticated
  with check (public.has_role((select auth.uid()), 'admin'));

create policy cities_update_admin on public.cities
  for update to authenticated
  using (public.has_role((select auth.uid()), 'admin'))
  with check (public.has_role((select auth.uid()), 'admin'));

-- audit_logs: solo lectura para administradores; la escritura es exclusiva del servidor.
create policy audit_logs_select_admin on public.audit_logs
  for select to authenticated
  using (public.has_role((select auth.uid()), 'admin'));
