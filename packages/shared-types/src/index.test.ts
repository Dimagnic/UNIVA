import { describe, expect, it } from 'vitest';
import { RIDE_STATUSES, RIDE_TRANSITIONS, canTransition, isTerminalStatus } from './index';

describe('máquina de estados del viaje', () => {
  it('permite el camino feliz completo con el actor correcto', () => {
    expect(canTransition('requested', 'searching_driver', 'system')).toBe(true);
    expect(canTransition('searching_driver', 'driver_assigned', 'driver')).toBe(true);
    expect(canTransition('driver_assigned', 'driver_arriving', 'driver')).toBe(true);
    expect(canTransition('driver_arriving', 'driver_arrived', 'driver')).toBe(true);
    expect(canTransition('driver_arrived', 'in_progress', 'driver')).toBe(true);
    expect(canTransition('in_progress', 'completed', 'driver')).toBe(true);
  });

  it('impide iniciar un viaje sin asignación válida', () => {
    expect(canTransition('requested', 'in_progress', 'driver')).toBe(false);
    expect(canTransition('searching_driver', 'in_progress', 'driver')).toBe(false);
  });

  it('impide finalizar un viaje que no ha comenzado', () => {
    expect(canTransition('driver_arrived', 'completed', 'driver')).toBe(false);
    expect(canTransition('driver_assigned', 'completed', 'driver')).toBe(false);
  });

  it('un pasajero no puede iniciar ni finalizar el viaje', () => {
    expect(canTransition('driver_arrived', 'in_progress', 'passenger')).toBe(false);
    expect(canTransition('in_progress', 'completed', 'passenger')).toBe(false);
  });

  it('los estados terminales no tienen salida', () => {
    for (const s of [
      'cancelled_by_passenger',
      'cancelled_by_driver',
      'no_driver_available',
      'expired',
    ] as const) {
      expect(isTerminalStatus(s)).toBe(true);
    }
    expect(isTerminalStatus('in_progress')).toBe(false);
  });

  it('toda transición apunta a un estado conocido', () => {
    for (const from of RIDE_STATUSES) {
      for (const to of Object.keys(RIDE_TRANSITIONS[from])) {
        expect(RIDE_STATUSES).toContain(to);
      }
    }
  });
});
