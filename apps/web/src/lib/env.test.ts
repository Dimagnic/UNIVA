import { describe, expect, it, vi } from 'vitest';

vi.stubGlobal('console', { ...console, error: () => undefined });

import { parseEnv } from './env';

describe('parseEnv', () => {
  it('trata las cadenas vacías como no configuradas', () => {
    const e = parseEnv({ VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '  ' });
    expect(e.VITE_SUPABASE_URL).toBeUndefined();
    expect(e.VITE_SUPABASE_ANON_KEY).toBeUndefined();
  });

  it('acepta valores válidos', () => {
    const e = parseEnv({
      VITE_SUPABASE_URL: 'https://abc.supabase.co',
      VITE_WHATSAPP_NUMBER: '522219663226',
    });
    expect(e.VITE_SUPABASE_URL).toBe('https://abc.supabase.co');
    expect(e.VITE_WHATSAPP_NUMBER).toBe('522219663226');
  });

  it('ignora la configuración completa si algún valor es inválido', () => {
    const e = parseEnv({ VITE_SUPABASE_URL: 'no-es-url', VITE_WHATSAPP_NUMBER: '123' });
    expect(e.VITE_SUPABASE_URL).toBeUndefined();
    expect(e.VITE_WHATSAPP_NUMBER).toBeUndefined();
  });
});
