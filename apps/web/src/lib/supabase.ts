import { createClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from './env';

/**
 * Cliente de Supabase del navegador. Solo usa la clave pública (anon);
 * la seguridad real la imponen las políticas RLS. NUNCA importar aquí `service_role`.
 */
export const supabase =
  isSupabaseConfigured && env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY
    ? createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
        auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
      })
    : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error('El servicio de cuentas aún no está configurado.');
  }
  return supabase;
}
