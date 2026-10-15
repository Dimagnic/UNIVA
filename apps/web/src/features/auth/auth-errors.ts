/** Traduce errores de Supabase Auth a mensajes claros, sin revelar si un correo existe. */
export function authErrorMessage(
  error: { code?: string | undefined; message?: string } | unknown,
): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code ?? '')
      : '';

  switch (code) {
    case 'invalid_credentials':
      return 'Correo o contraseña incorrectos.';
    case 'email_not_confirmed':
      return 'Confirma tu correo electrónico antes de iniciar sesión. Revisa tu bandeja y la carpeta de spam.';
    case 'weak_password':
      return 'La contraseña es demasiado débil. Usa al menos 10 caracteres con letras y números.';
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return 'Hiciste demasiados intentos. Espera unos minutos e inténtalo de nuevo.';
    case 'signup_disabled':
      return 'El registro de cuentas no está disponible por ahora.';
    case 'same_password':
      return 'La nueva contraseña debe ser distinta a la anterior.';
    default:
      return 'No pudimos completar la operación. Inténtalo de nuevo en unos momentos.';
  }
}
