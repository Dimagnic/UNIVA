import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const common = { 'aria-hidden': true, focusable: false } as const;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" {...common} {...props}>
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
      <path
        fill="#16a34a"
        d="M8.5 8.2c.2-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5.5.9 1.3 1.7 2.3 2.2.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .6-.3 1.3-.9 1.6-.5.3-1.2.4-1.9.2-3.2-.9-5.3-3.2-6-5.4-.2-.7 0-1.4.3-2.1Z"
      />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...common}
      {...props}
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...common}
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...common}
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...common} {...props}>
      <path d="M13.5 22v-8h2.7l.5-3.2h-3.2V8.7c0-.9.4-1.7 1.8-1.7h1.5V4.2S15.5 4 14.3 4C11.8 4 10.2 5.5 10.2 8.2v2.6H7.5V14h2.7v8h3.3Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...common}
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...common} {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.200 22 12 22 12s0-3.200-.4-4.800ZM10 15V9l5.200 3L10 15Z" />
    </svg>
  );
}
