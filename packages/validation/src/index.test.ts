import { describe, expect, it } from 'vitest';
import { loginSchema, mxPhoneSchema, passwordSchema, registerSchema } from './index';

const valid = {
  fullName: 'Ana López',
  email: 'ANA@Example.com ',
  phone: '221 966 3226',
  password: 'contrasena123',
  confirmPassword: 'contrasena123',
  intent: 'passenger' as const,
  acceptTerms: true as const,
};

describe('validación de registro', () => {
  it('normaliza correo y teléfono', () => {
    const parsed = registerSchema.parse(valid);
    expect(parsed.email).toBe('ana@example.com');
    expect(parsed.phone).toBe('2219663226');
  });

  it('rechaza contraseñas débiles', () => {
    expect(passwordSchema.safeParse('corta1').success).toBe(false);
    expect(passwordSchema.safeParse('sololetrasaqui').success).toBe(false);
    expect(passwordSchema.safeParse('1234567890123').success).toBe(false);
  });

  it('exige que las contraseñas coincidan', () => {
    const r = registerSchema.safeParse({ ...valid, confirmPassword: 'otra-distinta1' });
    expect(r.success).toBe(false);
  });

  it('exige aceptar términos', () => {
    const r = registerSchema.safeParse({ ...valid, acceptTerms: false });
    expect(r.success).toBe(false);
  });

  it('no permite elegir un rol privilegiado al registrarse', () => {
    const r = registerSchema.safeParse({ ...valid, intent: 'admin' });
    expect(r.success).toBe(false);
  });
});

describe('teléfono y login', () => {
  it('acepta solo 10 dígitos', () => {
    expect(mxPhoneSchema.safeParse('2219663226').success).toBe(true);
    expect(mxPhoneSchema.safeParse('+522219663226').success).toBe(false);
    expect(mxPhoneSchema.safeParse('123').success).toBe(false);
  });

  it('valida el formato del correo en login', () => {
    expect(loginSchema.safeParse({ email: 'no-es-correo', password: 'x' }).success).toBe(false);
  });
});
