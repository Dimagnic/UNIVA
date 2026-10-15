# Seguridad

## Reglas

- `service_role` y credenciales de proveedores solo existen en el servidor (Vercel / Edge Functions). Nunca en React, en archivos públicos ni en el repositorio.
- Los roles viven en `user_roles` y se verifican en servidor y RLS; ningún dato del navegador otorga permisos.
- Validación con Zod en cliente (UX) y servidor (autoridad).
- Mínimo privilegio: soporte no accede a documentos de identidad ni datos financieros.
- Documentos privados en Storage con URL firmadas de corta duración y accesos administrativos auditados.

## Decisión conocida: almacenamiento de sesión

`supabase-js` en una SPA guarda la sesión en `localStorage` (mecanismo oficial de la biblioteca). No se guarda
ninguna otra información sensible allí. Mitigaciones previstas: Content-Security-Policy estricta (Fase 6),
caducidad corta del JWT y ausencia de HTML inyectado sin sanear. Si se prefiere sesión en cookies httpOnly,
requiere un servidor intermedio (se evaluaría con la API de Fase 2).

## Cabeceras (ya en `vercel.json`)

`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy`.
La CSP queda para la Fase 6 porque el widget de ClienteAI y los mapas necesitan orígenes específicos.

## Terceros

El widget de ClienteAI se carga desde `clienteai.site` y se ejecuta con acceso a la página. Es una dependencia externa de confianza que debe revisarse en la auditoría de la Fase 6.

## ViajeSeguro: lo que NO se promete

Que un conductor verificado sea completamente seguro, ni que una alerta garantice asistencia inmediata. El botón de emergencia muestra el estado real y no simula contacto con servicios de emergencia sin integración efectiva.
