import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { server } from '@/mocks/server';
import {
  trendingHandlers,
  searchingHandlers,
  configurationHandlers,
} from '@/mocks/handlers';
import App from './App';

test('Should be able to find the data using a search box.', async () => {
  server.use(
    ...configurationHandlers,
    ...trendingHandlers,
    ...searchingHandlers,
  );
  render(<App />);

  await waitFor(() =>
    expect(screen.queryByTestId('home-title')).toHaveTextContent('Trending'),
  );
  const searchBox = screen.getByPlaceholderText(/search/i);
  await user.type(searchBox, 'poor');
  await user.keyboard('{Enter}');
  await waitFor(() =>
    expect(screen.queryByTestId('home-title')).toHaveTextContent(
      'Searching ...',
    ),
  );
  await waitFor(() =>
    expect(screen.queryByTestId('home-title')).toHaveTextContent(
      'Searching Result',
    ),
  );
});
