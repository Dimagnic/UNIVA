import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/auth-context';
import { buttonClass } from '../ui/Button';
import { CloseIcon, MenuIcon } from '../ui/icons';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Cómo funciona', to: '/#como-funciona' },
  { label: 'Seguridad', to: '/#seguridad' },
  { label: 'Conductores', to: '/#conductores' },
  { label: 'Ayuda', to: '/#ayuda' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleSignOut = async () => {
    close();
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={close}
          className="flex items-center gap-2.5"
          aria-label="UNIVA, inicio"
        >
          <img src="/brand/univa-mark.png" alt="" width={674} height={379} className="h-9 w-auto" />
          <span className="text-xl font-extrabold tracking-wide">UNIVA</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-semibold text-white/90 hover:text-brand-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <Link to="/cuenta" className={buttonClass('outline')}>
                Mi cuenta
              </Link>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                className={buttonClass('ghost')}
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/iniciar-sesion" className={buttonClass('ghost')}>
                Iniciar sesión
              </Link>
              <Link to="/registro" className={buttonClass('primary')}>
                Registrarme
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <div id="menu-movil" className="border-t border-line bg-ink px-4 pb-5 pt-3 lg:hidden">
          <nav aria-label="Principal móvil" className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className="rounded-lg px-2 py-3 text-base font-semibold hover:bg-surface-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid gap-2">
            {user ? (
              <>
                <Link to="/cuenta" onClick={close} className={buttonClass('outline')}>
                  Mi cuenta
                </Link>
                <button
                  type="button"
                  onClick={() => void handleSignOut()}
                  className={buttonClass('ghost')}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/iniciar-sesion" onClick={close} className={buttonClass('outline')}>
                  Iniciar sesión
                </Link>
                <Link to="/registro" onClick={close} className={buttonClass('primary')}>
                  Registrarme
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
