import { zodResolver } from '@hookform/resolvers/zod';
import { recoverSchema, type RecoverInput } from '@univa/validation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthCard } from '../components/layout/AuthCard';
import { Button } from '../components/ui/Button';
import { Notice } from '../components/ui/Notice';
import { TextField } from '../components/ui/TextField';
import { authErrorMessage } from '../features/auth/auth-errors';
import { isSupabaseConfigured } from '../lib/env';
import { supabase } from '../lib/supabase';

export function RecoverPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoverInput>({ resolver: zodResolver(recoverSchema) });

  const onSubmit = handleSubmit(async ({ email }) => {
    setServerError(null);
    if (!supabase) return;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/restablecer`,
    });
    // Solo mostramos errores de límite/servicio; nunca confirmamos si el correo existe.
    if (error && error.code === 'over_email_send_rate_limit') {
      setServerError(authErrorMessage(error));
      return;
    }
    setSent(true);
  });

  return (
    <AuthCard
      title="Recupera tu cuenta"
      subtitle="Te enviaremos un enlace para crear una nueva contraseña."
    >
      {sent ? (
        <Notice tone="ok">
          Si existe una cuenta con ese correo, recibirás un enlace en unos minutos. Revisa también
          tu carpeta de spam.
        </Notice>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <TextField
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            inputMode="email"
            error={errors.email?.message}
            {...register('email')}
          />
          {serverError ? <Notice tone="error">{serverError}</Notice> : null}
          <Button type="submit" className="w-full" disabled={isSubmitting || !isSupabaseConfigured}>
            {isSubmitting ? 'Enviando…' : 'Enviar enlace'}
          </Button>
        </form>
      )}
      <p className="mt-5 text-center text-sm">
        <Link to="/iniciar-sesion" className="font-semibold text-brand-300 hover:underline">
          Volver a iniciar sesión
        </Link>
      </p>
    </AuthCard>
  );
}
