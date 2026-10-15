import { ButtonLink } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="mx-auto grid w-full max-w-md place-items-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-gradient">404</p>
      <h1 className="mt-3 text-2xl font-extrabold">Esta página no existe</h1>
      <p className="mt-2 text-muted">Revisa la dirección o regresa al inicio.</p>
      <div className="mt-6">
        <ButtonLink to="/">Ir al inicio</ButtonLink>
      </div>
    </section>
  );
}
