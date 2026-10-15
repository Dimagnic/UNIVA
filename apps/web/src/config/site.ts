import { env } from '../lib/env';

const whatsappNumber = env.VITE_WHATSAPP_NUMBER ?? '522219663226';

export const site = {
  name: 'UNIVA',
  tagline: 'Movilidad segura y transparente para México.',
  contactEmail: env.VITE_CONTACT_EMAIL,
  whatsapp: {
    /** Provisional: se cambiará por el número definitivo de UNIVA. */
    number: whatsappNumber,
    display: '+52 221 966 3226',
    url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, quiero información sobre UNIVA.')}`,
  },
  social: {
    facebook: env.VITE_SOCIAL_FACEBOOK,
    instagram: env.VITE_SOCIAL_INSTAGRAM,
    youtube: env.VITE_SOCIAL_YOUTUBE,
  },
  clienteAi: {
    siteUrl: 'https://clienteai.site',
    chatUrl: 'https://clienteai.site/chat/qrzvhd8tq1o02mhq',
  },
} as const;
