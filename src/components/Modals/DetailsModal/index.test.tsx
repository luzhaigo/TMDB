import { ComponentProps, useState } from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Modal from 'react-modal';
import { server } from '@/mocks/server';
import { detailsHandlers, configurationHandlers } from '@/mocks/handlers';
import DetailsModal from '.';

const Dumb = ({ isOpen, ...rest }: ComponentProps<typeof DetailsModal>) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <>
      <button onClick={() => setOpen(true)}>Click</button>
      <DetailsModal {...rest} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

test('Should be able to open and close the modal', async () => {
  server.use(...configurationHandlers, ...detailsHandlers);
  const { container } = render(
    <Dumb isOpen={false} activeId={123} mediaType="movie" />,
  );
  Modal.setAppElement(container);

  await user.click(screen.getByText('Click'));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  await user.click(screen.getByTestId('x-mark'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByText('Click'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('Should be able to see a title and close a dialog', async () => {
  server.use(...configurationHandlers, ...detailsHandlers);
  const onClick = vitest.fn();
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(
    <DetailsModal isOpen activeId={123} mediaType="movie" onClose={onClick} />,
    {
      container,
    },
  );
  Modal.setAppElement(container);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  await user.click(screen.getByTestId('x-mark'));
  expect(onClick).toHaveBeenCalledTimes(1);

  const h3 = await screen.findByRole('heading', { level: 3 });
  expect(h3.textContent).toEqual(expect.any(String));
});
