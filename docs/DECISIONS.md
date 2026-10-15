# Decisiones del proyecto

Registro de decisiones aprobadas y supuestos. Fecha de la primera ronda: 2026-10-15.

## Aprobadas

| # | Tema | Decisión |
| --- | --- | --- |
| 1 | Asistente virtual | Widget de ClienteAI con el mismo token que Cero+ (`qrzvhd8tq1o02mhq`), cargado en `apps/web/index.html`. |
| 2 | QR | Se usa el mismo QR de ClienteAI de Cero+ (`apps/web/public/brand/clienteai-qr.png`). |
| 3 | Footer | Logo de Cero+ arriba a la izquierda y QR en la última columna, como en el modelo. |
| 4 | WhatsApp | +52 221 966 3226 (provisional; se cambiará después). Configurable con `VITE_WHATSAPP_NUMBER`. |
| 5 | Apps | Pasajero y conductor en una sola PWA (`apps/web`) con rutas por rol. Admin separado en Fase 2. |
| 6 | Mapas | Google Maps Platform detrás de un adaptador intercambiable. Requiere cuenta con facturación activa (plan de pago). |
| 7 | Pagos | Comparar Mercado Pago y Stripe antes de decidir (Fase 5). |
| 8 | Modelo comercial | Motor configurable: comisión, suscripción o híbrido. Valor inicial por definir. |
| 9 | Tiempo real | `pg_cron` + Supabase Realtime en el MVP; servicio Node persistente solo si el volumen lo exige. |
| 10 | Repositorio | Repositorio nuevo, preparado localmente; falta crearlo en GitHub y enlazarlo a Vercel. |

## Supuestos a confirmar

- **Decisión 6:** la preferencia fue "lo que usan Uber y DiDi". No se pudo verificar qué proveedor usa cada una, así que se eligió Google Maps Platform por cobertura y madurez. Se revalidan costos de Puebla antes del piloto.
- **Decisión 8:** respuesta ambigua; se construye el motor con los tres modelos y se decide el inicial antes de la Fase 4.
- El logo de Cero+ del footer es una versión en blanco generada a partir del JPEG recibido. Conviene reemplazarla por el archivo vectorial oficial.
- El botón de ClienteAI conserva el color que define su widget (verde); solo se reposiciona.
