import { combineReducers } from 'redux';

import animeList from './animeList';
import singleAnime from './singleAnime';
import animeCharacters from './characters';

/** @export const @type {func} With all the reducer combined */
const rootReducer = combineReducers({
  animeList,
  singleAnime,
  animeCharacters,
});

export default rootReducer;
