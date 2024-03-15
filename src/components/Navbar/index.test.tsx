import { render, screen } from '@testing-library/react';
import Navbar from '.';

test('Should see a GitHub icon anchor with correct attributes.', () => {
  render(<Navbar />);

  const anchor = screen.getByRole('link');
  expect(anchor).toHaveAttribute('target', '__blank');
  expect(anchor).toHaveAttribute('href', 'https://github.com/luzhaigo/TMDB');
});

test('Should see a title with a value of "TMDB".', () => {
  render(<Navbar />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('TMDB');
});
