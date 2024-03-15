import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchBox from '.';

test('Should be able to type some text and clear it by clicking the clear button.', async () => {
  render(<SearchBox />);

  const input = screen.getByPlaceholderText(/search/i);

  await user.type(input, 'poor');
  expect(input).toHaveDisplayValue('poor');

  await user.tab();
  const clearButton = screen.getByRole('button');
  expect(clearButton).toHaveFocus();

  await user.click(clearButton);
  expect(input).toHaveDisplayValue('');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
