import axios from 'axios';
import {
  PartialConstraint,
  TrendingQuery,
  GetMoviesData,
  GetTVsData,
  SearchingQuery,
} from '@/types';
import { Language } from '@/costants';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  },
});

export const getTrendingMovies = async (
  {
    time_window = 'day',
    language = Language,
    page = 1,
  } = {} as Partial<TrendingQuery>,
) => {
  return api
    .get<GetMoviesData>(
      `/trending/movie/${time_window}?language=${language}&page=${page}`,
    )
    .then((res) => res.data);
};

export const getTrendingTVs = async (
  {
    time_window = 'day',
    language = Language,
    page = 1,
  } = {} as Partial<TrendingQuery>,
) =>
  api
    .get<GetTVsData>(
      `/trending/tv/${time_window}?language=${language}&page=${page}`,
    )
    .then((res) => res.data);

export const searchMovies = async (
  { query, page = 1 } = {} as PartialConstraint<SearchingQuery, 'page'>,
) => {
  return api
    .get<GetMoviesData>(`/search/movie?query=${query}&page=${page}`)
    .then((res) => res.data);
};

export const searchTVs = async (
  { query, page = 1 } = {} as PartialConstraint<SearchingQuery, 'page'>,
) =>
  api
    .get<GetTVsData>(`/search/tv?query=${query}&page=${page}`)
    .then((res) => res.data);
