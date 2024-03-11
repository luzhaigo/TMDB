import { FC } from 'react';
import CardGrid from '@/components/CardGrid';
import Card from '@/components/Card';
import * as API from '@/api';
import { useMovieAndTVState } from '@/hooks/useMovieAndTVState';
import './homeView.css';

type Props = {
  mode?: 'trending' | 'searching';
  search?: string;
};

const Home: FC<Props> = ({ mode = 'trending', search }) => {
  const isSearchingMode = mode === 'searching';
  const trending = useMovieAndTVState({
    movie: {
      key: '/trending/movies',
      fetcher: ({ page }) => API.getTrendingMovies({ page }),
    },
    tv: {
      key: '/trending/tvs',
      fetcher: ({ page }) => API.getTrendingTVs({ page }),
    },
  });
  const searching = useMovieAndTVState({
    movie: {
      key: isSearchingMode ? '/search/movies' : null,
      params: search ? { query: search } : null,
      fetcher: ({ page, query }) => API.searchMovies({ page, query }),
    },
    tv: {
      key: isSearchingMode ? '/search/tvs' : null,
      params: search ? { query: search } : null,
      fetcher: ({ page, query }) => API.searchTVs({ page, query }),
    },
  });

  const activeRes = isSearchingMode ? searching : trending;

  return (
    <div className="home">
      <h2>Trending</h2>
      <div>
        <h3 className="home__subTitle">Movie</h3>
        <div>
          <CardGrid
            loading={activeRes.movie.isLoading || activeRes.movie.error != null}
            page={activeRes.movie.page}
            pageCount={activeRes.movie.data?.total_pages}
            data={activeRes.movie.data?.results}
            onPageChange={activeRes.movie.handlePageChange}
            render={(item) => {
              return (
                <Card
                  title={item.original_title}
                  imgSrc={item.poster_path}
                  date={item.release_date}
                  voteAverage={item.vote_average}
                  voteCount={item.vote_count}
                />
              );
            }}
          />
        </div>
      </div>
      <div>
        <h2>TV</h2>
        <div>
          <CardGrid
            loading={activeRes.tv.isLoading || activeRes.tv.error != null}
            page={activeRes.tv.page}
            pageCount={activeRes.tv.data?.total_pages}
            data={activeRes.tv.data?.results}
            onPageChange={activeRes.tv.handlePageChange}
            render={(item) => {
              return (
                <Card
                  title={item.original_name}
                  imgSrc={item.poster_path}
                  date={item.first_air_date}
                  voteAverage={item.vote_average}
                  voteCount={item.vote_count}
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
