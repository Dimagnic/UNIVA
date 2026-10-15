import { ButtonLink } from '../components/ui/Button';
import { Notice } from '../components/ui/Notice';
import { site } from '../config/site';

const steps = [
  {
    title: 'Elige tu trayecto',
    text: 'Indica origen y destino y ve el precio estimado antes de confirmar.',
  },
  {
    title: 'Conductor verificado',
    text: 'Te asignamos un conductor aprobado y ves quién llega y en qué vehículo.',
  },
  {
    title: 'Inicia con tu código',
    text: 'Cada viaje comienza con un código de un solo uso que tú compartes al abordar.',
  },
];

const safety = [
  [
    'Conductores verificados',
    'Revisamos identidad y documentos antes de aprobar a cada conductor. Sin aprobación no hay viajes.',
  ],
  ['Código de viaje', 'Un código de un solo uso confirma que subes al vehículo correcto.'],
  [
    'Seguimiento y viaje compartido',
    'Sigue el trayecto y compártelo con quien tú elijas mientras dura el viaje.',
  ],
  ['Contactos de confianza', 'Registra a las personas que pueden recibir tu viaje en tiempo real.'],
  [
    'Reporte de incidentes',
    'Avisa a nuestro equipo de seguridad desde la app. No sustituye al 911 en una emergencia.',
  ],
  [
    'Registro de eventos',
    'Cada viaje guarda sus eventos relevantes para poder revisar cualquier reclamación.',
  ],
] as const;

const driver = [
  'Desglose de cada viaje: lo que pagó el pasajero, la comisión y lo que te queda.',
  'Gastos estimados de combustible y mantenimiento para conocer tu ganancia real.',
  'Reportes por día, semana y mes, con historial de liquidaciones.',
  'Reglas de asignación y de comisiones publicadas, sin letra chica.',
  'Cobrado, estimado y liquidado siempre por separado.',
];

const faq = [
  [
    '¿Ya puedo pedir un viaje?',
    'Todavía no. Estamos construyendo UNIVA por fases con un piloto en Puebla. Puedes crear tu cuenta para estar listo cuando abramos.',
  ],
  [
    '¿En qué ciudades funcionará?',
    'El piloto está planeado para Puebla. Antes de abrir otra ciudad revisamos sus requisitos locales.',
  ],
  [
    '¿UNIVA sustituye al 911?',
    'No. En una emergencia llama al 911. La app ayuda a registrar y dar seguimiento a incidentes, pero no garantiza asistencia inmediata.',
  ],
  [
    '¿Cómo los contacto?',
    `Escríbenos por WhatsApp al ${site.whatsapp.display} o platica con el asistente virtual (botón en la esquina o QR al pie de la página).`,
  ],
] as const;

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-brand-500/20 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-300">
              Piloto en preparación · Puebla
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Muévete con confianza.{' '}
              <span className="text-brand-gradient">Conduce con claridad.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              UNIVA conecta pasajeros con conductores verificados, con precios claros antes de pedir
              y ganancias transparentes para quien conduce.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/registro" className="sm:min-w-44">
                Crear mi cuenta
              </ButtonLink>
              <ButtonLink to="/registro?rol=conductor" variant="outline" className="sm:min-w-44">
                Quiero ser conductor
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <img
              src="/brand/univa-logo.png"
              alt="Logotipo de UNIVA"
              width={925}
              height={610}
              className="h-auto w-full drop-shadow-[0_20px_60px_rgba(255,132,9,0.25)]"
            />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold">Cómo funciona</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-surface p-6">
                <span className="grid size-10 place-items-center rounded-full bg-brand-gradient text-lg font-extrabold text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Notice tone="info">
              Estas funciones se construyen por fases: por ahora puedes crear tu cuenta; el servicio
              de viajes aún no está disponible.
            </Notice>
          </div>
        </div>
      </section>

      <section id="seguridad" className="scroll-mt-20 border-b border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-400">ViajeSeguro</p>
          <h2 className="mt-1 text-3xl font-extrabold">Seguridad en cada trayecto</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safety.map(([title, text]) => (
              <li key={title} className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            La verificación reduce riesgos, pero no garantiza que un viaje sea completamente seguro.
          </p>
        </div>
      </section>

      <section id="conductores" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-400">
              ConductorJusto
            </p>
            <h2 className="mt-1 text-3xl font-extrabold">Sabe cuánto ganas, de verdad</h2>
            <p className="mt-4 text-muted">
              Mostramos con claridad cuánto cuesta trabajar y cuánto te queda. No prometemos
              ingresos mínimos: tus ganancias dependen de la demanda y de tus propios gastos.
            </p>
            <div className="mt-6">
              <ButtonLink to="/registro?rol=conductor">Quiero ser conductor</ButtonLink>
            </div>
          </div>
          <ul className="space-y-3">
            {driver.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 size-2.5 shrink-0 rounded-full bg-brand-gradient"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ayuda" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-extrabold">Preguntas frecuentes</h2>
          <div className="mt-8 space-y-3">
            {faq.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-line bg-surface p-4">
                <summary className="cursor-pointer list-none font-bold marker:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {q}
                    <span
                      aria-hidden="true"
                      className="text-brand-400 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
