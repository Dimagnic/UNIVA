import { z } from 'zod';

/** Todas las variables son públicas (prefijo VITE_). Los secretos viven solo en el servidor. */
const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

const envSchema = z.object({
  VITE_SUPABASE_URL: optionalString.pipe(z.url().optional()),
  VITE_SUPABASE_ANON_KEY: optionalString,
  VITE_CONTACT_EMAIL: optionalString,
  VITE_SOCIAL_FACEBOOK: optionalString.pipe(z.url().optional()),
  VITE_SOCIAL_INSTAGRAM: optionalString.pipe(z.url().optional()),
  VITE_SOCIAL_YOUTUBE: optionalString.pipe(z.url().optional()),
  VITE_WHATSAPP_NUMBER: optionalString.pipe(
    z
      .string()
      .regex(/^\d{12,13}$/)
      .optional(),
  ),
});

export type AppEnv = z.infer<typeof envSchema>;

export function parseEnv(raw: Record<string, unknown>): AppEnv {
  const result = envSchema.safeParse(raw);
  if (!result.success) {
    console.error('Variables de entorno inválidas:', z.prettifyError(result.error));
    // Falla "suave": los valores inválidos se ignoran, la app muestra el estado "sin configurar".
    return envSchema.parse({});
  }
  return result.data;
}

export const env = parseEnv(import.meta.env as Record<string, unknown>);

export const isSupabaseConfigured = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY);
