import {
  ReactNode,
  useCallback,
  useRef,
  ElementRef,
  KeyboardEvent,
} from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '@/components/Loading';
import './cardGrid.css';

type Props<T> = {
  loading?: boolean;
  page: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  data?: T[];
  render: (item: T, index: number) => ReactNode;
};

const CardGrid = <T extends { id: number | string }>({
  loading,
  page,
  pageCount,
  onPageChange,
  data,
  render,
}: Props<T>) => {
  const ulRef = useRef<ElementRef<'ul'>>(null);
  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => onPageChange?.(selected + 1),
    [onPageChange],
  );

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLUListElement>) => {
    const activeElement = document.activeElement;

    if (!activeElement?.classList.contains('card') || !ulRef.current) return;

    let index = [...ulRef.current.childNodes].findIndex(
      (node) => node.firstChild === document.activeElement,
    );
    if (index === -1) return;

    if (e.key === 'Enter') {
      return;
    }

    const arrow = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -5, ArrowDown: 5 };
    index = (index + arrow[e.key as keyof typeof arrow] + 20) % 20;

    (ulRef.current.childNodes[index].firstChild as HTMLElement)?.focus();
  }, []);

  return (
    <div className="cardGrid">
      {loading && (
        <div className="cardGrid__loading">
          <Loading />
        </div>
      )}
      {loading === false && (
        <ul ref={ulRef} className="cardGrid__list" onKeyDown={handleKeyPress}>
          {data?.map((item, index) => {
            return <li key={item.id}>{render(item, index)}</li>;
          })}
        </ul>
      )}
      <div className="cardGrid__pagination">
        {pageCount && (
          <ReactPaginate
            disableInitialCallback
            initialPage={page - 1 || 0}
            className="react-paginate"
            onPageChange={handlePageChange}
            // can not request the page more than 500
            pageCount={Math.min(pageCount, 500)}
          />
        )}
      </div>
    </div>
  );
};

export default CardGrid;
