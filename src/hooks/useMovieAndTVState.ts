import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

type Args<T, U> = {
  key?: string | null;
  params?: T;
  fetcher: (args: T & { page: number }) => U;
  page?: number;
};

export const useMovieAndTVState = <T, U, R1, R2>({
  movie,
  tv,
}: {
  movie: Args<T, R1>;
  tv: Args<U, R2>;
}) => {
  const [moviePage, setMoviePage] = useState(movie.page || 1);
  const [tvPage, setTVPage] = useState(tv.page || 1);

  const movieSWR = useSWRImmutable(
    movie.key ? [movie.key, { ...movie.params, page: moviePage }] : null,
    ([, args]) => movie.fetcher(args as T & { page: number }) as Awaited<R1>,
    { keepPreviousData: true },
  );

  const tvSWR = useSWRImmutable(
    tv.key ? [tv.key, { ...tv.params, page: tvPage }] : null,
    ([, args]) => tv.fetcher(args as U & { page: number }) as Awaited<R2>,
    { keepPreviousData: true },
  );

  return {
    movie: {
      ...movieSWR,
      page: moviePage,
      handlePageChange: setMoviePage,
    },
    tv: { ...tvSWR, page: tvPage, handlePageChange: setTVPage },
  };
};
