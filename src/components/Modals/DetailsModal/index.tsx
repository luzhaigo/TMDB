import { FC, useMemo } from 'react';
import Modal, { Props as ReactModalProps } from 'react-modal';
import useSWRImmutable from 'swr/immutable';
import { MediaType } from '@/types';
import * as API from '@/api';
import { timeFormatter } from '@/utils';
import RatingDisplay from '@/components/RatingDisplay';
import Loading from '@/components/Loading';
import './detailsModal.css';

type Props = ReactModalProps & {
  activeId: number;
  mediaType: MediaType;
  onClose?: () => void;
};

const DetailsModal: FC<Props> = ({ isOpen, activeId, mediaType, onClose }) => {
  const configSWR = useSWRImmutable('/configuration', API.getConfiguration);

  const movieSWR = useSWRImmutable(
    mediaType === 'movie' ? [`/movies/${activeId}`, activeId] : null,
    ([, id]) => API.getMovieDetailsById(id),
  );
  const tvSWR = useSWRImmutable(
    mediaType === 'tv' ? [`/tvs/${activeId}`, activeId] : null,
    ([, id]) => API.getTVDetailsById(id),
  );

  const loading = movieSWR.isLoading || tvSWR.isLoading;

  let title,
    imgSrc,
    date: unknown,
    runtime,
    genres,
    voteAverage,
    voteCount,
    overview,
    seasons,
    creators,
    stars;

  if (mediaType === 'movie') {
    title = movieSWR.data?.original_title;
    imgSrc = movieSWR.data?.poster_path;
    date = movieSWR.data?.release_date;
    runtime = movieSWR.data?.runtime
      ? timeFormatter(movieSWR.data.runtime)
      : movieSWR.data?.runtime;
    genres = movieSWR.data?.genres;
    voteAverage = movieSWR.data?.vote_average;
    voteCount = movieSWR.data?.vote_count;
    overview = movieSWR.data?.overview;
    creators = movieSWR.data?.credits.crew
      .filter(({ job }) => job === 'Director')
      .map(({ name }) => name);
    stars = movieSWR.data?.credits.cast.map(({ name }) => name).slice(0, 4);
  }

  if (mediaType === 'tv') {
    title = tvSWR.data?.original_name;
    imgSrc = tvSWR.data?.poster_path;
    date = tvSWR.data?.last_air_date;
    runtime = tvSWR.data?.episode_run_time?.[0]
      ? timeFormatter(tvSWR.data.episode_run_time[0])
      : tvSWR.data?.episode_run_time?.[0];
    genres = tvSWR.data?.genres;
    voteAverage = tvSWR.data?.vote_average;
    voteCount = tvSWR.data?.vote_count;
    overview = tvSWR.data?.overview;
    seasons = tvSWR.data?.number_of_seasons;
    creators = tvSWR.data?.created_by?.map(({ name }) => name);
    stars = tvSWR.data?.aggregate_credits.cast
      .map(({ name }) => name)
      .slice(0, 4);
  }

  const year = useMemo(
    () => (date ? new Date(date as string).getUTCFullYear() : '--'),
    [date],
  );

  return (
    <Modal isOpen={isOpen} className="detailsModal" onRequestClose={onClose}>
      {loading && <Loading />}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        width="40"
        height="40"
        className="detailsModal__xmark"
        tabIndex={0}
        onClick={onClose}
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
      {loading === false && (
        <div>
          <div className="detailsModal__info">
            {imgSrc ? (
              <img
                loading="lazy"
                className="card__poster"
                src={`${configSWR.data?.images.secure_base_url}${configSWR.data?.images.poster_sizes[0]}/${imgSrc}`}
                alt={title}
                width="92"
                height="138"
              />
            ) : (
              <div className="detailsModal__imgPlaceholder" />
            )}
            <div className="detailsModal__meta">
              <h3 className="detailsModal__title">{title}</h3>
              <div className="detailsModal__metrics">
                {year && <div className="detailsModal__metric">{year}</div>}
                {runtime && (
                  <div className="detailsModal__metric">{runtime}</div>
                )}
                {seasons && (
                  <div className="detailsModal__metric">
                    {seasons} season(s)
                  </div>
                )}
              </div>
              <div className="detailsModal__genres">
                {genres?.map((genre) => (
                  <div key={genre.name} className="detailsModal__genre">
                    {genre.name}
                  </div>
                ))}
              </div>
              {voteAverage != null && voteCount != null && (
                <div className="detailsModal__rating">
                  <RatingDisplay
                    size="l"
                    voteAverage={voteAverage}
                    voteCount={voteCount}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="detailsModal__overview">{overview}</div>
          {creators && creators.length !== 0 && (
            <div className="detailsModal__namesGroup">
              <div className="detailsModal__namesGroupTitle">
                {mediaType === 'movie' ? 'Directors' : 'Creators'}
              </div>
              <div className="detailsModal__names">
                {creators?.map((name) => (
                  <div key={name} className="detailsModal__name">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
          {stars && stars.length !== 0 && (
            <div className="detailsModal__namesGroup">
              <div className="detailsModal__namesGroupTitle">Stars</div>
              <div className="detailsModal__names">
                {stars?.map((name) => (
                  <div key={name} className="detailsModal__name">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default DetailsModal;
