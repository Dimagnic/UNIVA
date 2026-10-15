import { useEffect, useState } from 'react';
import { site } from '../../config/site';
import { ArrowUpIcon, WhatsAppIcon } from '../ui/icons';

/**
 * Pila de botones flotantes (derecha), de arriba abajo:
 *   subir (160px) · WhatsApp (92px) · ClienteAI (24px, lo inyecta su widget; ver index.css).
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {showTop ? (
        <button
          type="button"
          aria-label="Volver arriba"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-[160px] right-6 z-[60] grid size-11 place-items-center rounded-full border border-line bg-ink text-white shadow-lg hover:border-brand-500"
          style={{ marginRight: 6 }}
        >
          <ArrowUpIcon />
        </button>
      ) : null}

      <a
        href={site.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Escribir por WhatsApp al ${site.whatsapp.display}`}
        className="fixed bottom-[92px] right-6 z-[60] grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition hover:scale-105"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
