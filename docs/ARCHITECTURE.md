# Arquitectura

## Visión general

```
Navegador (PWA React + Vite)
   │  Supabase Auth / lecturas con RLS / Realtime autorizado
   ├────────────► Supabase (Postgres + PostGIS, Auth, Storage, Edge Functions)
   │  operaciones críticas (precio, asignación, estados, pagos)
   └────────────► API Node/TS en Vercel (/api/v1)  ── Fase 2
                        │
                        └─► Proveedores: mapas, pagos, SMS, correo, identidad
```

- **Frontend**: React, Vite, TypeScript estricto, Tailwind, React Router, TanStack Query, React Hook Form + Zod.
- **API**: Node.js/TypeScript, REST versionada, validación y autorización en cada operación.
- **Datos**: Postgres con RLS; las operaciones críticas se ejecutan en transacciones o funciones SQL.
- **Tiempo real**: Supabase Realtime con canales autorizados; `pg_cron` para expiraciones.
- **Proveedores**: detrás de interfaces (mapas, pagos, notificaciones, identidad) para poder cambiarlos.

## Principios

1. El precio, las transiciones de estado y los permisos se validan en servidor y base de datos.
2. El navegador nunca recibe `service_role` ni secretos de proveedores.
3. Cada módulo tiene responsabilidades claras; sin lógica de negocio en las vistas.
4. No se simulan ubicaciones, pagos ni verificaciones en producción.

## Máquina de estados del viaje

Implementada en `packages/shared-types` y replicada en servidor/BD en la Fase 2.

```
requested → searching_driver → driver_assigned → driver_arriving → driver_arrived → in_progress → completed
Alternos: cancelled_by_passenger · cancelled_by_driver · no_driver_available · expired · disputed
```

Cada transición define actor permitido. `driver_arrived → in_progress` exige código de viaje de un solo uso.

## Asignación (Fase 2)

1. Cotización firmada y con vigencia calculada en servidor.
2. Creación del viaje con clave de idempotencia.
3. Consulta PostGIS de conductores aprobados, disponibles, con documentos vigentes y categoría correcta.
4. Oferta a un conductor a la vez con tiempo límite; el rechazo no penaliza.
5. Aceptación con actualización condicional atómica para evitar doble asignación.

## Infraestructura adicional

Las funciones serverless no sostienen bien conexiones persistentes ni procesos largos. Para el MVP se usa
Realtime + `pg_cron`; si crece el volumen de ubicaciones, se añade un servicio Node persistente.
