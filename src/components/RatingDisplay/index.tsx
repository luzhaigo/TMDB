import { FC } from 'react';
import cls from 'classnames';
import { ratingFormatter } from '@/utils';
import './ratingDisplay.css';

type Props = {
  size?: 'm' | 'l';
  voteAverage: number;
  voteCount: number;
};

const RatingDisplay: FC<Props> = ({ size = 'm', voteAverage, voteCount }) => {
  const isSizeL = size === 'l';

  return (
    <div
      className={cls('ratingDisplay', { 'size-l': isSizeL })}
      data-testid="rating"
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        className={cls('ratingDisplay__star', { 'size-l': isSizeL })}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="presentation"
      >
        <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
      </svg>
      <div className="ratingDisplay__voteAverage">
        {ratingFormatter.format(voteAverage)}
      </div>
      <div>({ratingFormatter.format(voteCount)})</div>
    </div>
  );
};

export default RatingDisplay;
