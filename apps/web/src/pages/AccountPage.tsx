import type { AppRole } from '@univa/shared-types';
import { useQuery } from '@tanstack/react-query';
import { Notice } from '../components/ui/Notice';
import { useAuth } from '../features/auth/auth-context';
import { requireSupabase } from '../lib/supabase';

interface ProfileRow {
  full_name: string;
  phone: string | null;
  signup_intent: 'passenger' | 'driver';
}

const roleLabels: Record<AppRole, string> = {
  passenger: 'Pasajero',
  driver: 'Conductor',
  admin: 'Administrador',
  support: 'Soporte y seguridad',
};

export function AccountPage() {
  const { user, signOut } = useAuth();

  const query = useQuery({
    queryKey: ['me', user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const client = requireSupabase();
      const [profile, roles] = await Promise.all([
        client
          .from('profiles')
          .select('full_name, phone, signup_intent')
          .eq('id', user?.id ?? '')
          .single<ProfileRow>(),
        client
          .from('user_roles')
          .select('role')
          .eq('user_id', user?.id ?? ''),
      ]);
      if (profile.error) throw profile.error;
      if (roles.error) throw roles.error;
      return {
        profile: profile.data,
        roles: (roles.data as { role: AppRole }[]).map((r) => r.role),
      };
    },
  });

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold">Mi cuenta</h1>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
        {query.isPending ? (
          <p className="text-muted" role="status">
            Cargando tu perfil…
          </p>
        ) : query.isError ? (
          <Notice tone="error">
            No pudimos cargar tu perfil. Inténtalo de nuevo en unos momentos.
          </Notice>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Nombre</dt>
              <dd className="mt-1 text-lg font-semibold">{query.data.profile.full_name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Correo</dt>
              <dd className="mt-1 break-all">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Celular</dt>
              <dd className="mt-1">{query.data.profile.phone ?? 'No registrado'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Roles</dt>
              <dd className="mt-1">
                {query.data.roles.length
                  ? query.data.roles.map((r) => roleLabels[r]).join(', ')
                  : 'Sin roles asignados'}
              </dd>
            </div>
          </dl>
        )}
      </div>

      {query.data?.profile.signup_intent === 'driver' && !query.data.roles.includes('driver') ? (
        <div className="mt-5">
          <Notice tone="info">
            Elegiste registrarte como conductor. El registro de documentos y la verificación llegan
            en la siguiente fase; hasta entonces no podrás recibir viajes.
          </Notice>
        </div>
      ) : null}

      <div className="mt-6">
        <button
          type="button"
          onClick={() => void signOut()}
          className="min-h-11 rounded-xl border border-line px-5 text-sm font-bold hover:border-brand-500"
        >
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}
