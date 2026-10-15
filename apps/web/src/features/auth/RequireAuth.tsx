import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-context';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-muted" role="status">
        Cargando tu sesión…
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/iniciar-sesion" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}
