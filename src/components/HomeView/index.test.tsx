import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Modal from 'react-modal';
import user from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import {
  trendingHandlers,
  configurationHandlers,
  detailsHandlers,
} from '@/mocks/handlers';
import { server } from '@/mocks/server';
import HomeView from '.';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
};

test('Should see a title and two sub-titles.', async () => {
  server.use(...trendingHandlers);
  render(<HomeView imgPrefix="http://example.com/" />, { wrapper: Wrapper });

  expect(screen.getByText('Trending')).toBeInTheDocument();
  const titles = screen.getAllByRole('heading', { level: 3 });
  expect(titles).toHaveLength(2);
  const expectedTitles = ['Movie', 'TV'];
  titles.forEach((t, idx) => expect(t).toHaveTextContent(expectedTitles[idx]));
});

test('Should be able to interact with the cards in the movie section.', async () => {
  server.use(...configurationHandlers, ...trendingHandlers, ...detailsHandlers);
  const { container } = render(<HomeView imgPrefix="http://example.com/" />, {
    wrapper: Wrapper,
  });

  Modal.setAppElement(container);

  await waitFor(() => expect(screen.getAllByRole('status')).toHaveLength(2));
  await waitFor(() => expect(screen.queryAllByRole('status')).toHaveLength(0));

  await waitFor(() => expect(screen.getAllByTestId('cards')).toHaveLength(2));
  const cardSections = screen.getAllByTestId('cards');

  const movieCards = cardSections[0];
  await user.tab();
  expect(movieCards!.children[0]).toHaveFocus();
  await user.keyboard('{arrowRight}');
  expect(movieCards!.children[1]).toHaveFocus();
  await user.keyboard('{arrowDown}');
  expect(movieCards!.children[6]).toHaveFocus();

  await user.keyboard('{Enter}');
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('Should be able to interact with the cards in the tv section.', async () => {
  server.use(...configurationHandlers, ...trendingHandlers, ...detailsHandlers);
  const { container } = render(<HomeView imgPrefix="http://example.com/" />, {
    wrapper: Wrapper,
  });

  Modal.setAppElement(container);

  await waitFor(() => expect(screen.getAllByRole('status')).toHaveLength(2));
  await waitFor(() => expect(screen.queryAllByRole('status')).toHaveLength(0));

  await waitFor(() => expect(screen.getAllByTestId('cards')).toHaveLength(2));
  const cardSections = screen.getAllByTestId('cards');

  const tvCards = cardSections[1];
  await user.click(tvCards!.children[0]);
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByTestId('x-mark'));

  expect(tvCards!.children[0]).toHaveFocus();
  await user.keyboard('{arrowRight}');
  expect(tvCards!.children[1]).toHaveFocus();
  await user.keyboard('{arrowDown}');
  expect(tvCards!.children[6]).toHaveFocus();

  await user.keyboard('{Enter}');
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
