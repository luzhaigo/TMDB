export type PartialConstraint<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

export type Pagination<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type MediaType = 'tv' | 'movie' | 'person';

type BaseMedia<T extends MediaType> = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  media_type: T;
};

export type Movie = BaseMedia<'movie'> & {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
};

export type TV = BaseMedia<'tv'> & {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: number[];
};

export type TimeWindow = 'day' | 'week';

export type TrendingQuery = {
  time_window: TimeWindow;
  language: string;
  page: number;
};
export type GetMoviesData = Pagination<Movie>;
export type GetTVsData = Pagination<TV>;

export type SearchingQuery = {
  query: string;
  page: number;
};
