import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Modal from 'react-modal';
import CardGrid from '.';

test('Should render a loading component.', () => {
  const { rerender } = render(
    <CardGrid
      loading
      mediaType="movie"
      page={500}
      data={[{ id: 123 }, { id: 456 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
    />,
  );

  const loading = screen.getByRole('status');
  expect(loading).toBeInTheDocument();

  rerender(
    <CardGrid
      loading={false}
      mediaType="movie"
      page={500}
      data={[{ id: 123 }, { id: 456 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
    />,
  );

  expect(loading).not.toBeInTheDocument();
});

test('Should see a list of cards.', () => {
  render(
    <CardGrid
      loading={false}
      mediaType="movie"
      page={500}
      data={[{ id: 123 }, { id: 456 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
    />,
  );

  const list = screen.getByRole('presentation');
  expect(list.childNodes).toHaveLength(2);
});

test('Should be able to hover a card and execute an onCardEnter function.', async () => {
  const onCardEnterMock = vitest.fn();
  render(
    <CardGrid
      loading={false}
      mediaType="movie"
      page={500}
      data={[{ id: 123 }, { id: 456 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
      onCardEnter={onCardEnterMock}
    />,
  );

  const list = screen.getByRole('presentation');

  await user.hover(list.children[0]);

  expect(onCardEnterMock).toHaveBeenCalledOnce();
});

test('Should be able to use keyboard to navigate through cards and execute an onCardFocus function.', async () => {
  const onCardFocusMock = vitest.fn();
  render(
    <CardGrid
      loading={false}
      mediaType="movie"
      page={500}
      columnCount={2}
      data={[{ id: 12 }, { id: 34 }, { id: 56 }, { id: 78 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
      onCardFocus={onCardFocusMock}
    />,
  );

  const list = screen.getByRole('presentation');
  const [firstCard, secondCard, thirdCard, forthCard] = list.children;
  await user.tab();

  expect(firstCard).toHaveFocus();
  expect(onCardFocusMock).toHaveBeenCalledTimes(1);
  expect(onCardFocusMock).toHaveBeenCalledWith(12);

  await user.keyboard('{ArrowRight}');
  expect(secondCard).toHaveFocus();
  expect(onCardFocusMock).toHaveBeenCalledTimes(2);
  expect(onCardFocusMock).toHaveBeenCalledWith(34);

  await user.keyboard('{ArrowDown}');
  expect(forthCard).toHaveFocus();
  expect(onCardFocusMock).toHaveBeenCalledTimes(3);
  expect(onCardFocusMock).toHaveBeenCalledWith(78);

  await user.keyboard('{ArrowLeft}');
  expect(thirdCard).toHaveFocus();
  expect(onCardFocusMock).toHaveBeenCalledTimes(4);
  expect(onCardFocusMock).toHaveBeenCalledWith(56);

  await user.keyboard('{ArrowUp}');
  expect(firstCard).toHaveFocus();
  expect(onCardFocusMock).toHaveBeenCalledTimes(5);
  expect(onCardFocusMock).toHaveBeenCalledWith(12);
});

test('Should be able to click the pagination.', async () => {
  const onPageChangeMock = vitest.fn();
  render(
    <CardGrid
      loading={false}
      mediaType="movie"
      page={1}
      columnCount={2}
      pageCount={2}
      data={[{ id: 12 }, { id: 34 }, { id: 56 }, { id: 78 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
      onPageChange={onPageChangeMock}
    />,
  );

  const next = screen.getByText(/next/i);
  await user.click(next);

  expect(onPageChangeMock).toHaveBeenCalled();
});

test('Should be able to click a card and open card details dialog.', async () => {
  const { container } = render(
    <CardGrid
      loading={false}
      mediaType="movie"
      page={1}
      columnCount={2}
      pageCount={2}
      data={[{ id: 12 }, { id: 34 }, { id: 56 }, { id: 78 }]}
      render={(media) => {
        return <div>{media.id}</div>;
      }}
    />,
  );

  Modal.setAppElement(container);

  await user.tab();
  await user.keyboard('{Enter}');

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
