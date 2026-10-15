import { z } from 'zod';

/** Mismos esquemas en el navegador (UX) y en el servidor (autoridad). */

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Escribe tu correo electrónico')
  .max(254, 'El correo es demasiado largo')
  .pipe(z.email('Escribe un correo válido'));

export const passwordSchema = z
  .string()
  .min(10, 'Usa al menos 10 caracteres')
  .max(128, 'La contraseña es demasiado larga')
  .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), 'Incluye al menos una letra y un número');

/** Teléfono móvil de México: 10 dígitos, sin lada internacional. */
export const mxPhoneSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ''))
  .pipe(z.string().regex(/^\d{10}$/, 'Escribe los 10 dígitos de tu celular'));

export const signupIntentSchema = z.enum(['passenger', 'driver']);
export type SignupIntent = z.infer<typeof signupIntentSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Escribe tu contraseña').max(128),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Escribe tu nombre completo')
      .max(120, 'El nombre es demasiado largo'),
    email: emailSchema,
    phone: mxPhoneSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    intent: signupIntentSchema,
    acceptTerms: z.literal(true, { error: 'Debes aceptar los términos y el aviso de privacidad' }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Las contraseñas no coinciden',
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const recoverSchema = z.object({ email: emailSchema });
export type RecoverInput = z.infer<typeof recoverSchema>;

export const resetPasswordSchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Las contraseñas no coinciden',
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
