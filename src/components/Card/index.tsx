import { FC, useMemo, ImgHTMLAttributes } from 'react';
import LazyImage from '@/components/LazyImage';
import RatingDisplay from '@/components/RatingDisplay';
import './card.css';

type Props = Pick<ImgHTMLAttributes<HTMLImageElement>, 'loading'> & {
  title: string;
  imgSrc?: string;
  date?: string;
  voteAverage: number;
  voteCount: number;
  onClick?: () => void;
};

const Card: FC<Props> = ({
  loading,
  title,
  imgSrc,
  date,
  voteAverage,
  voteCount,
  onClick,
}) => {
  const year = useMemo(
    () => (date ? new Date(date).getUTCFullYear() : '--'),
    [date],
  );

  return (
    <div className="card" onClick={onClick}>
      {imgSrc ? (
        <LazyImage
          loading={loading}
          className="card__poster"
          src={imgSrc}
          alt={title}
          width="92"
          height="138"
        />
      ) : (
        <div className="card__imgPlaceholder" />
      )}
      <div className="card__info">
        <h4 className="card__title" title={title}>
          {title}
        </h4>
        <div className="card__meta" data-testid="card-year">
          <div>{year}</div>
        </div>
        <RatingDisplay voteAverage={voteAverage} voteCount={voteCount} />
      </div>
    </div>
  );
};

export default Card;
