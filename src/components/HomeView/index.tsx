import { FC } from 'react';
import CardGrid from '@/components/CardGrid';
import Card from '@/components/Card';
import * as API from '@/api';
import { useMediaLists } from '@/hooks/useMediaLists';
import './homeView.css';

type Props = {
  mode?: 'trending' | 'searching';
  search?: string;
};

const Home: FC<Props> = ({ mode = 'trending', search }) => {
  const isSearchingMode = mode === 'searching';
  const trending = useMediaLists({
    movie: {
      key: '/trending/movies',
      fetcher: ({ page }) => API.getTrendingMovies({ page }),
    },
    tv: {
      key: '/trending/tvs',
      fetcher: ({ page }) => API.getTrendingTVs({ page }),
    },
  });
  const searching = useMediaLists({
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
  const title = isSearchingMode
    ? searching.movie.isLoading || searching.tv.isLoading
      ? 'Searching ...'
      : 'Searching Result'
    : 'Trending';

  return (
    <div className="home">
      <h2>{title}</h2>
      <div className="home__content">
        <div>
          <h3 className="home__subTitle">Movie</h3>
          <div>
            <CardGrid
              loading={
                activeRes.movie.isLoading || activeRes.movie.error != null
              }
              mediaType="movie"
              page={activeRes.movie.page}
              pageCount={activeRes.movie.data?.total_pages}
              data={activeRes.movie.data?.results}
              onPageChange={activeRes.movie.handlePageChange}
              render={(media) => {
                return (
                  <Card
                    title={media.original_title}
                    imgSrc={media.poster_path}
                    date={media.release_date}
                    voteAverage={media.vote_average}
                    voteCount={media.vote_count}
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
              mediaType="tv"
              page={activeRes.tv.page}
              pageCount={activeRes.tv.data?.total_pages}
              data={activeRes.tv.data?.results}
              onPageChange={activeRes.tv.handlePageChange}
              render={(media) => {
                return (
                  <Card
                    title={media.original_name}
                    imgSrc={media.poster_path}
                    date={media.first_air_date}
                    voteAverage={media.vote_average}
                    voteCount={media.vote_count}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
