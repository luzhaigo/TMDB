export type PartialConstraint<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

export type Pagination<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Configuration = {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
};

export type MediaType = 'tv' | 'movie' | 'person';

type ImagePath = string | null;

type BaseMedia<T extends MediaType> = {
  adult: boolean;
  backdrop_path: ImagePath;
  id: number;
  original_language: string;
  overview: string;
  poster_path: ImagePath;
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

export type DetailsQuery = {
  id: number;
  language: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: ImagePath;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: ImagePath;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: ImagePath;
      cast_id: number;
      character: number;
      credit_id: number;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: ImagePath;
      credit_id: string;
      department: string;
      job: string;
    }[];
  };
};

export type TVDetails = {
  adult: boolean;
  backdrop_path: ImagePath;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: ImagePath;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: ImagePath;
  };
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: ImagePath;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: ImagePath;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: ImagePath;
    season_number: number;
    vote_average: number;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  aggregate_credits: {
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: ImagePath;
      roles: {
        credit_id: string;
        character: string;
        episode_count: number;
      }[];
      total_episode_count: number;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: ImagePath;
      jobs: {
        credit_id: string;
        job: string;
        episode_count: number;
      }[];
      department: string;
      total_episode_count: number;
    }[];
  };
};
