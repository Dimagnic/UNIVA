/** Roles de la plataforma. La fuente de verdad es la tabla `user_roles` (nunca el navegador). */
export const APP_ROLES = ['passenger', 'driver', 'admin', 'support'] as const;
export type AppRole = (typeof APP_ROLES)[number];

/** Estados del viaje (máquina de estados formal, ver docs/ARCHITECTURE.md). */
export const RIDE_STATUSES = [
  'requested',
  'searching_driver',
  'driver_assigned',
  'driver_arriving',
  'driver_arrived',
  'in_progress',
  'completed',
  'cancelled_by_passenger',
  'cancelled_by_driver',
  'no_driver_available',
  'expired',
  'disputed',
] as const;
export type RideStatus = (typeof RIDE_STATUSES)[number];

export type RideActor = 'passenger' | 'driver' | 'system' | 'admin';

type TransitionMap = Record<RideStatus, Partial<Record<RideStatus, readonly RideActor[]>>>;

/**
 * Transiciones permitidas y quién puede ejecutarlas.
 * Esta tabla se replica en el servidor (y en la base de datos en la Fase 2);
 * el cliente solo la usa para mostrar acciones disponibles, nunca para autorizar.
 *
 * Nota: `driver_arrived → in_progress` exige además validar el código de viaje
 * de un solo uso en el servidor.
 */
export const RIDE_TRANSITIONS: TransitionMap = {
  requested: {
    searching_driver: ['system'],
    cancelled_by_passenger: ['passenger'],
    expired: ['system'],
  },
  searching_driver: {
    driver_assigned: ['driver', 'system'],
    no_driver_available: ['system'],
    cancelled_by_passenger: ['passenger'],
    expired: ['system'],
  },
  driver_assigned: {
    driver_arriving: ['driver'],
    searching_driver: ['system'],
    cancelled_by_passenger: ['passenger'],
    cancelled_by_driver: ['driver'],
  },
  driver_arriving: {
    driver_arrived: ['driver'],
    searching_driver: ['system'],
    cancelled_by_passenger: ['passenger'],
    cancelled_by_driver: ['driver'],
  },
  driver_arrived: {
    in_progress: ['driver'],
    cancelled_by_passenger: ['passenger'],
    cancelled_by_driver: ['driver'],
  },
  in_progress: {
    completed: ['driver'],
    disputed: ['passenger', 'admin'],
  },
  completed: {
    disputed: ['passenger', 'driver', 'admin'],
  },
  disputed: {
    completed: ['admin'],
  },
  cancelled_by_passenger: {},
  cancelled_by_driver: {},
  no_driver_available: {},
  expired: {},
};

export function canTransition(from: RideStatus, to: RideStatus, actor: RideActor): boolean {
  const allowed = RIDE_TRANSITIONS[from][to];
  return allowed !== undefined && allowed.includes(actor);
}

export function isTerminalStatus(status: RideStatus): boolean {
  return Object.keys(RIDE_TRANSITIONS[status]).length === 0;
}
