import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FloatingActions } from './FloatingActions';
import { Footer } from './Footer';
import { Header } from './Header';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand-400 focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        Saltar al contenido
      </a>
      <ScrollManager />
      <Header />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
