import { FC, useMemo, ImgHTMLAttributes } from 'react';
import LazyImage from '@/components/LazyImage';
import RatingDisplay from '@/components/RatingDisplay';
import './card.css';

type Props = Pick<ImgHTMLAttributes<HTMLImageElement>, 'loading'> & {
  title: string;
  imgSrc: string | null;
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
      {imgSrc && (
        <LazyImage
          loading={loading}
          className="card__poster"
          src={imgSrc}
          alt={title}
          width="92"
          height="138"
        />
      )}
      <div className="card__info">
        <div className="card__title" title={title}>
          {title}
        </div>
        <div className="card__meta">
          <div>{year}</div>
        </div>
        <RatingDisplay voteAverage={voteAverage} voteCount={voteCount} />
      </div>
    </div>
  );
};

export default Card;
