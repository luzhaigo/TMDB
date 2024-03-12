import {
  ReactNode,
  useState,
  useCallback,
  useRef,
  ElementRef,
  KeyboardEvent,
} from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '@/components/Loading';
import DetailsModal from '@/components/Modals/DetailsModal';
import { useToggle } from '@/hooks/useToggle';
import './cardGrid.css';

type Props<T> = {
  loading?: boolean;
  page: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  data?: T[];
  render: (item: T, index: number) => ReactNode;
  pageSize?: number;
  columnCount?: number;
};

type Id = number | string;
const ColumnCount = 5;

const CardGrid = <T extends { id: Id }>({
  loading,
  page,
  pageCount,
  onPageChange,
  data,
  render,
  pageSize = 20,
  columnCount = ColumnCount,
}: Props<T>) => {
  const ulRef = useRef<ElementRef<'ul'>>(null);
  const [activeId, setActiveId] = useState<Id | null>(null);
  const [isOpen, { toggleOn, toggleOff }] = useToggle(false);
  const isCustomizedColumnCount = columnCount !== ColumnCount;

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => onPageChange?.(selected + 1),
    [onPageChange],
  );

  const closeModal = useCallback(() => {
    toggleOff();
  }, [toggleOff]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      const activeElement = document.activeElement;

      if (!activeElement?.hasAttribute('data-item') || !ulRef.current) return;

      let index = [...ulRef.current.childNodes].findIndex(
        (node) => node === document.activeElement,
      );
      if (index === -1) return;

      if (e.key === 'Escape') {
        setActiveId(null);
        (ulRef.current.childNodes[index] as HTMLElement)?.blur();
        return;
      }

      if (e.key === 'Enter') {
        toggleOn();
        return;
      }

      const arrow = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -columnCount,
        ArrowDown: columnCount,
      };
      index =
        (index + arrow[e.key as keyof typeof arrow] + pageSize) % pageSize;

      (ulRef.current.childNodes[index] as HTMLElement)?.focus();
    },
    [columnCount, pageSize, toggleOn],
  );

  return (
    <div className="cardGrid">
      {loading && (
        <div className="cardGrid__loading">
          <Loading />
        </div>
      )}
      {loading === false && (
        <ul
          ref={ulRef}
          className="cardGrid__list"
          onKeyDown={handleKeyDown}
          style={
            isCustomizedColumnCount
              ? {
                  gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                }
              : undefined
          }
        >
          {data?.map((item, index) => {
            return (
              <li
                key={item.id}
                tabIndex={0}
                data-item={index}
                onClick={toggleOn}
                onFocus={() => setActiveId(item.id)}
                onBlur={() => {
                  if (activeId === item.id) return;
                  setActiveId(null);
                }}
              >
                {render(item, index)}
              </li>
            );
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
      <DetailsModal
        isOpen={isOpen}
        onClose={closeModal}
        activeId={(activeId as number) ?? undefined}
      />
    </div>
  );
};

export default CardGrid;
