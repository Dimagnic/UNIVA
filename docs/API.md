# API

La API de servidor (`apps/api`, `/api/v1`) se implementa en la Fase 2. En la Fase 1 el frontend solo usa
Supabase Auth y lecturas protegidas por RLS.

## Dominios previstos

`/auth` · `/passengers` · `/drivers` · `/vehicles` · `/verifications` · `/rides` · `/locations` · `/fares` ·
`/payments` · `/earnings` · `/payouts` · `/subscriptions` · `/safety` · `/incidents` · `/support` · `/admin` · `/notifications`

## Contrato de cada endpoint

Método, ruta, autorización requerida, esquema de entrada (Zod), respuesta, códigos de error, validaciones y efectos en la base de datos. Las operaciones críticas (crear viaje, aceptar, cambiar estado, pagos) usan claves de idempotencia y transacciones.
