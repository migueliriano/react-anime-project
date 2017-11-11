import {
  REQUEST_SINGLE_ANIME,
  RECIEVE_SINGLE_ANIME_DATA,
  REQUEST_SINGLE_ANIME_FAILED,
} from 'actions/singleAnimeCreator';

/**
 * App's initial state, Redux will use these values
 * to bootstrap our app, before having a generated state.
 */
const initialStateAnimeList = {
  isFeching: false,
  anime: {},
  error: false,
  errorMessage: '',
};

/**
 * Reducer - this part is in charge of changing the global state
 *
 * @typedef {object} initialStateAnimeList
 *
 * @param {Object=initialStateAnimeList} state  - App's current state.
 * @param {object}  action - This has the action will be Fired.
 * @returns {Object} Returns the app's new state.
 */
export default function singleAnime(state = initialStateAnimeList, action) {
  switch (action.type) {
    case REQUEST_SINGLE_ANIME:
      return {
        ...state,
        isFeching: true,
        error: false,
      };
    case RECIEVE_SINGLE_ANIME_DATA:
      return {
        ...state,
        isFeching: false,
        anime: { ...action.payload.anime },
        error: false,
      };
    case REQUEST_SINGLE_ANIME_FAILED:
      return {
        ...state,
        isFeching: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
