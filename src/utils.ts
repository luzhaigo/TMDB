import { Language } from '@/costants';

export const ratingFormatter = new Intl.NumberFormat(Language, {
  maximumFractionDigits: 1,
  notation: 'compact',
});

export const timeFormatter = (mins: number) => {
  const quotient = Math.trunc(mins / 60);
  return `${quotient > 0 ? `${quotient}h ` : ''}${mins % 60}min`;
};
