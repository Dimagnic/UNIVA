-- Datos semilla SOLO para desarrollo local. No contiene usuarios ni datos reales.
-- La ciudad piloto queda inactiva hasta cumplir los criterios de lanzamiento.
insert into public.cities (name, state, timezone, is_active)
values ('Puebla', 'Puebla', 'America/Mexico_City', false)
on conflict (name, state) do nothing;
