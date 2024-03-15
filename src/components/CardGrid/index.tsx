import {
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useRef,
  ElementRef,
  KeyboardEvent,
} from 'react';
import ReactPaginate from 'react-paginate';
import Loading from '@/components/Loading';
import DetailsModal from '@/components/Modals/DetailsModal';
import { useToggle } from '@/hooks/useToggle';
import { MediaType } from '@/types';
import './cardGrid.css';

type Props<T> = {
  loading?: boolean;
  mediaType: MediaType;
  page: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  data?: T[];
  render: (media: T, index: number) => ReactNode;
  pageSize?: number;
  columnCount?: number;
  onCardFocus?: (id: Id) => void;
  onCardEnter?: (id: Id) => void;
};

type Id = number | string;
const ColumnCount = 5;

const CardGrid = <T extends { id: Id }>({
  loading,
  mediaType,
  page,
  pageCount,
  onPageChange,
  data,
  render,
  pageSize = 20,
  columnCount = ColumnCount,
  onCardFocus,
  onCardEnter,
}: Props<T>) => {
  const ulRef = useRef<ElementRef<'ul'>>(null);
  const [activeId, setActiveId] = useState<Id | null>(null);
  const [isOpen, { toggleOn, toggleOff }] = useToggle(false);
  const isCustomizedColumnCount = columnCount !== ColumnCount;
  const activeMedia = useMemo(() => {
    if (!activeId) return null;

    return data?.find((media) => media.id === activeId) ?? null;
  }, [activeId, data]);

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }) => onPageChange?.(selected + 1),
    [onPageChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      const activeElement = document.activeElement;

      if (!activeElement?.hasAttribute('data-media') || !ulRef.current) return;

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
      {loading === false &&
        (data && data?.length !== 0 ? (
          <ul
            ref={ulRef}
            role="presentation"
            data-testid="cards"
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
            {data.map((media, index) => {
              return (
                <li
                  key={media.id}
                  tabIndex={0}
                  data-media={index}
                  onClick={toggleOn}
                  onFocus={() => {
                    setActiveId(media.id);
                    onCardFocus?.(media.id);
                  }}
                  onMouseEnter={
                    onCardEnter ? () => onCardEnter(media.id) : undefined
                  }
                  onBlur={() => {
                    if (activeId === media.id) return;
                    setActiveId(null);
                  }}
                >
                  {render(media, index)}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="cardGrid__noData">No Data</div>
        ))}
      {pageCount && data && data.length !== 0 && (
        <div className="cardGrid__pagination">
          <ReactPaginate
            disableInitialCallback
            initialPage={page - 1 || 0}
            className="react-paginate"
            onPageChange={handlePageChange}
            // can not request the page more than 500
            pageCount={Math.min(pageCount, 500)}
          />
        </div>
      )}
      {activeId && activeMedia && (
        <DetailsModal
          isOpen={isOpen}
          onClose={toggleOff}
          activeId={activeId as number}
          mediaType={mediaType}
        />
      )}
    </div>
  );
};

export default CardGrid;
