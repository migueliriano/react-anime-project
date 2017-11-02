import { combineReducers } from 'redux';

import animeList from './animeList';
import singleAnime from './singleAnime';
import animeCharacters from './characters';

const rootReducer = combineReducers({
  animeList,
  singleAnime,
  animeCharacters,
});

export default rootReducer;
