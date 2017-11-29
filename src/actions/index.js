import * as animeList from './animeList';
import * as animeListCreators from './animeListCreators';
import * as singleAnime from './singleAnime';
import * as singleAnimeCreators from './singleAnimeCreators';

/** @export @type {object} */
export default {
  ...animeList,
  ...singleAnime,
  ...singleAnimeCreators,
  ...animeListCreators,
};

