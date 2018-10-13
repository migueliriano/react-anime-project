import { combineReducers } from 'redux';

import animeList from './animeList';
import singleAnime from './singleAnime';
import animeCharacters from './characters';
import searchAnime from './searchAnime';

/**
 * Combine all the reducers in one collection.
 *
 * @export const
 * @type {function}
 *
 * @return {function}
 */
const rootReducer = combineReducers({
  animeList,
  singleAnime,
  animeCharacters,
  searchAnime,
});

export default rootReducer;
