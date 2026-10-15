import { Link, useParams } from 'react-router-dom';
import { Notice } from '../components/ui/Notice';
import { NotFoundPage } from './NotFoundPage';

const documents: Record<string, string> = {
  privacidad: 'Aviso de privacidad',
  terminos: 'Términos y condiciones',
  cancelaciones: 'Política de cancelación',
  tarifas: 'Tarifas y comisiones',
};

export function LegalPage() {
  const { slug = '' } = useParams();
  const title = documents[slug];
  if (!title) return <NotFoundPage />;

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <div className="mt-6">
        <Notice tone="warn">
          Este documento está en preparación y se publicará, tras revisión legal, antes de abrir el
          piloto. Aún no tiene validez contractual.
        </Notice>
      </div>
      <p className="mt-6">
        <Link to="/" className="font-semibold text-brand-300 hover:underline">
          Volver al inicio
        </Link>
      </p>
    </section>
  );
}
