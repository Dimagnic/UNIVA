# UNIVA

Plataforma mexicana de movilidad con dos propuestas de valor:

- **ViajeSeguro** — verificación de conductores, código de viaje, seguimiento y gestión de incidentes.
- **ConductorJusto** — desglose de tarifas, comisiones y ganancias reales para el conductor.

Ciudad piloto: **Puebla**. Moneda: **MXN**. Idioma: español (México).

## Estado actual: Fase 1 (infraestructura), código escrito y sin verificar

> **Importante:** el código de esta fase se escribió en un entorno sin acceso al registro de npm, por lo
> que **todavía no se ha instalado, compilado ni probado**. Las versiones de `package.json` se declararon
> sin resolverse y no existe `package-lock.json`. Primer paso: `npm install`, luego `npm run typecheck`,
> `npm run lint`, `npm test` y `npm run build`, y corregir lo que aparezca.

| Escrito (sin verificar) | Aún no existe |
| --- | --- |
| Monorepo, CI, configuración de Vercel | Solicitud de viajes y asignación (Fase 2) |
| Registro, inicio de sesión y recuperación con Supabase Auth | Verificación de conductores (Fase 2) |
| Perfiles y roles con RLS (migración `0001`) | ViajeSeguro (Fase 3) |
| Sitio de marca, footer con QR de ClienteAI, botones flotantes | ConductorJusto, pagos, notificaciones (Fases 4–5) |
| Máquina de estados del viaje (tipos y pruebas) | API de servidor (`apps/api`, Fase 2) |

## Requisitos

- Node.js 22 o superior
- Un proyecto de Supabase (para cuentas) — ver [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## Puesta en marcha

```bash
npm install
cp .env.example apps/web/.env.local   # completa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
npm run dev                           # http://localhost:5173
```

Sin las variables de Supabase la app funciona, pero los formularios de cuenta quedan deshabilitados
y lo indican en pantalla.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Typecheck y compilación de producción |
| `npm run typecheck` | TypeScript estricto en todos los paquetes |
| `npm run lint` | ESLint |
| `npm run format:check` | Prettier |
| `npm test` | Pruebas unitarias (Vitest) |

## Estructura

```
apps/web/            PWA React + Vite (pasajero y conductor)
packages/shared-types/  Roles, estados de viaje y transiciones
packages/validation/    Esquemas Zod compartidos navegador/servidor
supabase/            Migraciones SQL, seed y config
docs/                Arquitectura, base de datos, seguridad, API, despliegue, decisiones
```

`apps/admin-web` y `apps/api` se crean en la Fase 2, cuando tienen funcionalidad real.

## Documentación

[ARCHITECTURE](docs/ARCHITECTURE.md) · [DATABASE](docs/DATABASE.md) · [SECURITY](docs/SECURITY.md) ·
[API](docs/API.md) · [DEPLOYMENT](docs/DEPLOYMENT.md) · [DECISIONS](docs/DECISIONS.md)

## Reglas del repositorio

- Nunca subir `.env`, claves ni datos reales. `service_role` jamás va en el frontend.
- Cambios por rama y pull request; el CI debe pasar antes de integrar.


