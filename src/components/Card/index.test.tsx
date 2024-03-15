import { render, screen } from '@testing-library/react';
import Card from '.';

test('Should render a Card component without a poster', () => {
  const title = 'Card Title';
  const { rerender } = render(
    <Card title={title} voteAverage={4.4566} voteCount={1001} />,
  );

  const h4 = screen.getByRole('heading', { level: 4 });
  expect(h4).toHaveTextContent(title);
  const rating = screen.getByTestId('rating');
  expect(rating).toHaveTextContent(/4\.5\s*\(1K\)/);
  expect(screen.queryByAltText(title)).not.toBeInTheDocument();
  const cardYear = screen.getByTestId('card-year');
  expect(cardYear).toHaveTextContent('--');

  rerender(
    <Card
      title={title}
      voteAverage={4.4566}
      voteCount={1001}
      date="2011-01-10"
    />,
  );

  expect(cardYear).toHaveTextContent('2011');
});

test('Should render a Card component with a poster', () => {
  const title = 'Card Title';
  const imgSrc = 'http://example.com/image.png';
  render(
    <Card title={title} voteAverage={0.95} voteCount={2001} imgSrc={imgSrc} />,
  );

  const h4 = screen.getByRole('heading', { level: 4 });
  expect(h4).toHaveTextContent(title);
  const rating = screen.getByTestId('rating');
  expect(rating).toHaveTextContent(/1\s*\(2K\)/);
  const img = screen.queryByAltText('') as HTMLImageElement | null;
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('data-alt', title);
  expect(img).toHaveAttribute('data-src', imgSrc);
  expect(img!.src).toBe('');
});
