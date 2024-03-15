import { render, screen } from '@testing-library/react';
import LazyImage from '.';

test('Should render LazyImage with src and alt without passing loading prop.', () => {
  const alt = 'lazy image...';
  const src = 'http://lazy.com/image';
  render(<LazyImage alt={alt} src={src} />);

  const img = screen.getByAltText('') as HTMLImageElement;
  expect(img.dataset.alt).toBe(alt);
  expect(img.alt).toBe('');
  expect(img.src).toBe('');
  expect(img.dataset.src).toBe(src);
});

test('Should render LazyImage with src and alt attributes without waiting for lazy loading.', () => {
  const alt = 'eager image...';
  const src = 'http://eager.com/image';
  render(<LazyImage loading="eager" alt={alt} src={src} />);

  const img = screen.getByAltText(alt) as HTMLImageElement;
  expect(img.dataset.alt).toBe(alt);
  expect(img.alt).toBe(alt);
  expect(img.src).toBe(src);
  expect(img.dataset.src).toBe(src);
});
