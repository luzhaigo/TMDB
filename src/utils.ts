import { Language } from '@/costants';

export const ratingFormatter = new Intl.NumberFormat(Language, {
  maximumFractionDigits: 1,
  notation: 'compact',
});

export const timeFormatter = (mins: number) => {
  return `${mins / 60 > 0 ? `${Math.ceil(mins / 60)}h ` : ''} ${mins % 60}min`;
};
