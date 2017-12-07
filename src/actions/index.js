import * as animeListCreators from './animeListCreators';
import * as singleAnimeCreators from './singleAnimeCreators';
import * as animeList from './animeList';
import singleAnime from './singleAnime';
import characters from './characters';

/** @export @type {object} */
export default {
  ...animeList,
  ...singleAnimeCreators,
  ...animeListCreators,
  singleAnime,
  characters,
};

