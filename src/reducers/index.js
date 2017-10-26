import { combineReducers } from 'redux';

import * as animeList from './animeList';
import * as singleAnime from './singleAnime';

const rootReducer = combineReducers({
  ...animeList,
  ...singleAnime,
});

export default rootReducer;
