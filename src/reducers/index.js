import { combineReducers } from 'redux';

import animeList from './animeList';
import singleAnime from './singleAnime';

const rootReducer = combineReducers({
  animeList,
  singleAnime,
});

export default rootReducer;
