import type { ReactNode } from 'react';

type Tone = 'info' | 'warn' | 'error' | 'ok';

const tones: Record<Tone, string> = {
  info: 'border-brand-500/40 bg-brand-500/10 text-brand-300',
  warn: 'border-warn/40 bg-warn/10 text-warn',
  error: 'border-danger/40 bg-danger/10 text-danger',
  ok: 'border-ok/40 bg-ok/10 text-ok',
};

export function Notice({ tone = 'info', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}
    >
      {children}
    </div>
  );
}
