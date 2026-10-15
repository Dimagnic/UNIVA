import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@univa/validation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/layout/AuthCard';
import { Button } from '../components/ui/Button';
import { Notice } from '../components/ui/Notice';
import { TextField } from '../components/ui/TextField';
import { authErrorMessage } from '../features/auth/auth-errors';
import { isSupabaseConfigured } from '../lib/env';
import { supabase } from '../lib/supabase';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/cuenta';
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      setServerError(authErrorMessage(error));
      return;
    }
    navigate(from, { replace: true });
  });

  return (
    <AuthCard title="Inicia sesión" subtitle="Bienvenido de vuelta a UNIVA.">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        {serverError ? <Notice tone="error">{serverError}</Notice> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting || !isSupabaseConfigured}>
          {isSubmitting ? 'Entrando…' : 'Iniciar sesión'}
        </Button>
      </form>
      <div className="mt-5 flex flex-col gap-2 text-center text-sm text-muted">
        <Link to="/recuperar" className="text-brand-300 hover:underline">
          Olvidé mi contraseña
        </Link>
        <span>
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-brand-300 hover:underline">
            Regístrate
          </Link>
        </span>
      </div>
    </AuthCard>
  );
}
