import type { ReactNode } from 'react';
import { isSupabaseConfigured } from '../../lib/env';
import { Notice } from '../ui/Notice';

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        {subtitle ? <p className="mt-1.5 text-sm text-muted">{subtitle}</p> : null}
        {!isSupabaseConfigured ? (
          <div className="mt-5">
            <Notice tone="warn">
              El servicio de cuentas todavía no está conectado (faltan las variables de Supabase).
              Consulta docs/DEPLOYMENT.md.
            </Notice>
          </div>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
