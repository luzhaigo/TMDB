import trendingHandlers from './trendingHandlers';
import searchingHandlers from './searchingHandlers';
import configurationHandlers from './configurationHandlers';
import detailsHandlers from './detailsHandlers';

export {
  trendingHandlers,
  searchingHandlers,
  configurationHandlers,
  detailsHandlers,
};
export default [
  ...trendingHandlers,
  ...searchingHandlers,
  ...configurationHandlers,
  ...detailsHandlers,
];
