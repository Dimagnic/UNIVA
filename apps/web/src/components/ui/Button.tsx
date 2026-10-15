import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-gradient text-ink shadow-lg shadow-brand-600/20 hover:brightness-110',
  outline: 'border border-line bg-surface text-white hover:border-brand-500 hover:text-brand-300',
  ghost: 'text-white hover:bg-surface-2',
};

export function buttonClass(variant: Variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

type ButtonLinkProps = LinkProps & { variant?: Variant };

export function ButtonLink({ variant = 'primary', className = '', ...rest }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...rest} />;
}
