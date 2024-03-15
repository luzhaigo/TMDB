import { render, screen } from '@testing-library/react';
import RatingDisplay from '.';

test('Should render the RatingDisplay component with multiple voteAverage and voteCount values.', () => {
  const { rerender } = render(
    <RatingDisplay voteAverage={4.4566} voteCount={1001} />,
  );

  const rating = screen.getByTestId('rating');

  expect(rating).toHaveTextContent(/4\.5\s*\(1K\)/);

  rerender(<RatingDisplay voteAverage={14.4466} voteCount={900} />);
  expect(rating).toHaveTextContent(/14\.4\s*\(900\)/);

  rerender(<RatingDisplay voteAverage={9.99} voteCount={1} />);
  expect(rating).toHaveTextContent(/10\s*\(1\)/);
});
