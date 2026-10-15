import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../ui/icons';

const navigation = [
  { label: 'Inicio', to: '/' },
  { label: 'Cómo funciona', to: '/#como-funciona' },
  { label: 'Seguridad', to: '/#seguridad' },
  { label: 'Conductores', to: '/#conductores' },
  { label: 'Preguntas frecuentes', to: '/#ayuda' },
];

const services = [
  { label: 'Pedir un viaje', to: '/registro?rol=pasajero' },
  { label: 'Ser conductor', to: '/registro?rol=conductor' },
  { label: 'ViajeSeguro · seguridad en cada trayecto', to: '/#seguridad' },
  { label: 'ConductorJusto · ganancias claras', to: '/#conductores' },
  { label: 'Soporte y reportes de incidentes', to: '/#ayuda' },
];

const legal = [
  { label: 'Aviso de privacidad', to: '/legal/privacidad' },
  { label: 'Términos y condiciones', to: '/legal/terminos' },
  { label: 'Política de cancelación', to: '/legal/cancelaciones' },
  { label: 'Tarifas y comisiones', to: '/legal/tarifas' },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">{children}</h2>;
}

function FooterLinks({ items }: { items: { label: string; to: string }[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <Link to={item.to} className="text-sm text-muted transition hover:text-brand-300">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const socialClass =
  'grid size-10 place-items-center rounded-full border border-line text-muted transition hover:border-brand-500 hover:text-brand-300';

export function Footer() {
  const { social, contactEmail, whatsapp, clienteAi } = site;

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.2fr_1.15fr_1.2fr]">
        {/* Columna 1: marca + contacto (misma posición que en el modelo) */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Tecnología desarrollada por
          </p>
          <img
            src="/brand/cero-logo-light.png"
            alt="Cero+"
            width={528}
            height={182}
            className="mt-2 h-14 w-auto"
          />
          <p className="mt-4 max-w-[16rem] text-sm text-muted">
            UNIVA: movilidad segura y transparente para México. Piloto en preparación en Puebla.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            {contactEmail ? (
              <p>
                <a href={`mailto:${contactEmail}`} className="text-white/90 hover:text-brand-300">
                  {contactEmail}
                </a>
              </p>
            ) : null}
            <p>
              <a
                href={whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#22c55e] hover:underline"
              >
                WhatsApp: {whatsapp.display}
              </a>
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            {social.facebook ? (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de UNIVA"
                className={socialClass}
              >
                <FacebookIcon />
              </a>
            ) : null}
            {social.instagram ? (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de UNIVA"
                className={socialClass}
              >
                <InstagramIcon />
              </a>
            ) : null}
            {social.youtube ? (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de UNIVA"
                className={socialClass}
              >
                <YoutubeIcon />
              </a>
            ) : null}
          </div>
        </div>

        {/* Columna 2 */}
        <nav aria-label="Navegación del pie de página">
          <ColumnTitle>Navegación</ColumnTitle>
          <FooterLinks items={navigation} />
        </nav>

        {/* Columna 3 */}
        <nav aria-label="Servicios">
          <ColumnTitle>Servicios</ColumnTitle>
          <FooterLinks items={services} />
        </nav>

        {/* Columna 4 */}
        <nav aria-label="Legal">
          <ColumnTitle>Legal</ColumnTitle>
          <FooterLinks items={legal} />
          <p className="mt-5 text-sm text-muted">
            Tarifas en pesos mexicanos (MXN), mostradas antes de confirmar cada viaje y sujetas a
            cambio con aviso. UNIVA no garantiza disponibilidad de conductores en todo momento ni
            sustituye a los servicios de emergencia: en una emergencia llama al 911.
          </p>
        </nav>

        {/* Columna 5: asistente virtual con QR (misma posición que en el modelo) */}
        <div>
          <ColumnTitle>Asistente virtual</ColumnTitle>
          <a
            href={clienteAi.chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-[190px] overflow-hidden rounded-xl"
          >
            <img
              src="/brand/clienteai-qr.png"
              alt="Código QR para chatear con el asistente virtual"
              width={600}
              height={700}
              loading="lazy"
              className="h-auto w-full"
            />
          </a>
          <p className="mt-3 max-w-[14rem] text-sm text-muted">
            Escanea el código y chatea con nuestro asistente.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} UNIVA. Todos los derechos reservados.</p>
          <p className="text-xs font-extrabold uppercase tracking-wider text-white">
            Diseñado por Cero+
          </p>
        </div>
      </div>
    </footer>
  );
}
