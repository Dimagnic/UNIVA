import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordInput } from '@univa/validation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/layout/AuthCard';
import { Button } from '../components/ui/Button';
import { Notice } from '../components/ui/Notice';
import { TextField } from '../components/ui/TextField';
import { authErrorMessage } from '../features/auth/auth-errors';
import { useAuth } from '../features/auth/auth-context';
import { isSupabaseConfigured } from '../lib/env';
import { supabase } from '../lib/supabase';

export function ResetPasswordPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = handleSubmit(async ({ password }) => {
    setServerError(null);
    if (!supabase) return;
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setServerError(authErrorMessage(error));
      return;
    }
    navigate('/cuenta', { replace: true });
  });

  return (
    <AuthCard title="Nueva contraseña">
      {loading ? (
        <p className="text-muted" role="status">
          Validando tu enlace…
        </p>
      ) : !user ? (
        <>
          <Notice tone="warn">
            El enlace expiró o no es válido. Solicita uno nuevo para continuar.
          </Notice>
          <p className="mt-5 text-center text-sm">
            <Link to="/recuperar" className="font-semibold text-brand-300 hover:underline">
              Solicitar otro enlace
            </Link>
          </p>
        </>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <TextField
            label="Nueva contraseña"
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
          {serverError ? <Notice tone="error">{serverError}</Notice> : null}
          <Button type="submit" className="w-full" disabled={isSubmitting || !isSupabaseConfigured}>
            {isSubmitting ? 'Guardando…' : 'Guardar contraseña'}
          </Button>
        </form>
      )}
    </AuthCard>
  );
}
