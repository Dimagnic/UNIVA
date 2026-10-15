# Base de datos

## Implementado (migración `20261015000000_foundation.sql`)

| Tabla | Propósito | Acceso desde el cliente |
| --- | --- | --- |
| `profiles` | Nombre, celular y preferencia de registro | Lee y edita solo el propio; admin lee |
| `user_roles` | Fuente de verdad de permisos | Solo lectura propia; admin lee. Sin escritura |
| `cities` | Ciudades de operación | Públicas las activas; admin gestiona |
| `audit_logs` | Acciones sensibles | Solo lectura de admin; escribe el servidor |

- `handle_new_user()` crea perfil y rol `passenger` al registrarse, saneando los metadatos. Un usuario no puede obtener `driver`, `admin` ni `support` desde el navegador.
- `has_role()` es `security definer` con `search_path` fijo.
- PostGIS está habilitado para la búsqueda geográfica de la Fase 2.

## Pendiente por fase

- **Fase 2**: `driver_profiles`, `driver_documents`, `driver_verifications`, `vehicles`, `vehicle_documents`, `service_zones`, `ride_categories`, `fare_rules`, `rides`, `ride_events`, `ride_locations`, `ride_assignments`.
- **Fase 3**: `trusted_contacts`, `safety_incidents`, `incident_events`, `support_tickets`.
- **Fase 4–5**: `payments`, `payment_events`, `refunds`, `driver_earnings`, `driver_expenses`, `driver_payouts`, `subscriptions`, `promotions`, `ratings`, `notifications`.

## Convenciones

UUID como clave, `timestamptz`, importes en centavos enteros, borrado lógico o restrictivo en registros financieros y de seguridad, RLS explícita en cada tabla protegida y pruebas de políticas.

## Verificación

Esta migración **no se ha ejecutado ni validado** contra una base real (ni siquiera con un analizador de SQL). Aplícala primero en un proyecto de Supabase de desarrollo, revisa que no haya errores y comprueba las políticas RLS con usuarios de prueba antes de usarla. Las pruebas automáticas de RLS están pendientes.
