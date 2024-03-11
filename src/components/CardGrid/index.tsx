import { ReactNode, useCallback } from 'react';
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
  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => onPageChange?.(selected + 1),
    [onPageChange],
  );

  return (
    <div className="cardGrid">
      {loading && (
        <div className="cardGrid__loading">
          <Loading />
        </div>
      )}
      {loading === false && (
        <ul className="cardGrid__list">
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
