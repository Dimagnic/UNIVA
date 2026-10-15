import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@univa/validation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthCard } from '../components/layout/AuthCard';
import { Button } from '../components/ui/Button';
import { Notice } from '../components/ui/Notice';
import { TextField } from '../components/ui/TextField';
import { authErrorMessage } from '../features/auth/auth-errors';
import { isSupabaseConfigured } from '../lib/env';
import { supabase } from '../lib/supabase';

export function RegisterPage() {
  const [params] = useSearchParams();
  const defaultIntent = params.get('rol') === 'conductor' ? 'driver' : 'passenger';
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { intent: defaultIntent },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    if (!supabase) return;
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/iniciar-sesion`,
        // Solo datos de perfil. El rol real lo asigna el servidor; "intent" es una preferencia.
        data: { full_name: values.fullName, phone: values.phone, signup_intent: values.intent },
      },
    });
    if (error) {
      setServerError(authErrorMessage(error));
      return;
    }
    setDone(true);
  });

  if (done) {
    return (
      <AuthCard title="Revisa tu correo">
        <Notice tone="ok">
          Si el correo es válido, te enviamos un enlace para confirmar tu cuenta. Confírmalo y luego
          inicia sesión.
        </Notice>
        <p className="mt-5 text-center text-sm">
          <Link to="/iniciar-sesion" className="font-semibold text-brand-300 hover:underline">
            Ir a iniciar sesión
          </Link>
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Crea tu cuenta" subtitle="Toma menos de un minuto.">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Quiero usar UNIVA como</legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ['passenger', 'Pasajero'],
                ['driver', 'Conductor'],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-line bg-surface px-3 text-sm font-semibold has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500/10 has-[:checked]:text-brand-300"
              >
                <input type="radio" value={value} className="sr-only" {...register('intent')} />
                {label}
              </label>
            ))}
          </div>
          <p className="text-xs text-muted">
            Los conductores deben completar y aprobar su verificación antes de recibir viajes.
          </p>
        </fieldset>

        <TextField
          label="Nombre completo"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Celular (10 dígitos)"
          type="tel"
          autoComplete="tel-national"
          inputMode="numeric"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          hint="Al menos 10 caracteres, con letras y números."
          error={errors.password?.message}
          {...register('password')}
        />
        <TextField
          label="Confirma tu contraseña"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-brand-500"
              {...register('acceptTerms')}
            />
            <span>
              Acepto los{' '}
              <Link to="/legal/terminos" className="text-brand-300 underline">
                términos y condiciones
              </Link>{' '}
              y el{' '}
              <Link to="/legal/privacidad" className="text-brand-300 underline">
                aviso de privacidad
              </Link>
              .
            </span>
          </label>
          {errors.acceptTerms ? (
            <p role="alert" className="mt-1 text-sm text-danger">
              {errors.acceptTerms.message}
            </p>
          ) : null}
        </div>

        {serverError ? <Notice tone="error">{serverError}</Notice> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting || !isSupabaseConfigured}>
          {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{' '}
        <Link to="/iniciar-sesion" className="font-semibold text-brand-300 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthCard>
  );
}
