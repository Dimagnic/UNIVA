# Despliegue

> Estado: **no desplegado**. Nada de lo siguiente se ha ejecutado; son los pasos para hacerlo.

## 0. Verificación local (obligatoria antes de subir)

```bash
npm install            # genera package-lock.json (el CI usa `npm ci`, que lo necesita)
npm run typecheck && npm run lint && npm test && npm run build
git add package-lock.json && git commit -m "Agrega package-lock.json"
```

Las versiones de `package.json` no se resolvieron al escribir el código; si algún rango no existe o hay
conflicto de dependencias, ajústalo aquí primero.

## 1. GitHub

El repositorio local ya está inicializado y con el primer commit.

```bash
git remote add origin https://github.com/<organizacion>/univa.git
git push -u origin main
```

Activa protección de la rama `main` (PR obligatorio y CI en verde).

## 2. Supabase

1. Crea un proyecto por entorno (desarrollo, pruebas, producción).
2. Aplica `supabase/migrations/*.sql` (SQL Editor o `supabase db push`).
3. Authentication → URL Configuration: agrega la URL del sitio y las rutas `/iniciar-sesion` y `/restablecer` como redirecciones permitidas.
4. Authentication → Providers → Email: activa confirmación de correo y longitud mínima de contraseña de 10.
5. Copia `Project URL` y la clave `anon` (Project Settings → API).

## 3. Vercel

1. Importa el repositorio. El `vercel.json` de la raíz define instalación (`npm ci`), compilación y directorio de salida (`apps/web/dist`), además del reescrito para React Router y las cabeceras de seguridad.
2. Variables (Preview y Production): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_WHATSAPP_NUMBER`, y opcionales `VITE_CONTACT_EMAIL`, `VITE_SOCIAL_*`.
3. Despliega, abre la URL y verifica: registro, correo de confirmación, inicio de sesión, `/cuenta` y rutas directas (por ejemplo `/registro`).

## Variables

Ver `.env.example`. Solo las `VITE_*` llegan al navegador; los secretos del servidor (Fase 2 en adelante) se configuran únicamente en Vercel y Supabase.

## Pendiente de configurar

Dominio propio, proveedor de correo SMTP para producción, monitorización de errores, proyectos separados de pruebas y producción.
