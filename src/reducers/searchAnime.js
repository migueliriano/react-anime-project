import {
  REQUEST_SEARCH_ANIME,
  RECIEVE_SEARCH_ANIME_DATA,
  REQUEST_SEARCH_ANIME_FAILED,
} from 'actions/searchAnimeCreators';

/**
 * App's initial state, Redux will use these values
 * to bootstrap our app, before having a generated state.
 *
 * @type {object}
 */
const initialStateSearchAnime = {
  isFeching: false,
  animes: [],
  error: false,
  errorMessage: '',
};

/**
 * Reducer - this part is in charge of changing the global state
 *
 * @typedef {object} initialStateSearchAnime
 *
 * @param {Object=initialStateSearchAnime} state  - App's current state.
 * @param {object}  action - This has the action will be Fired.
 * @returns {Object} Returns the app's new state.
 */
export default function singleAnime(state = initialStateSearchAnime, action) {
  switch (action.type) {
    case REQUEST_SEARCH_ANIME:
      return {
        ...state,
        isFeching: true,
      };
    case RECIEVE_SEARCH_ANIME_DATA:
      return {
        ...state,
        isFeching: false,
        animes: action.payload.animes,
      };
    case REQUEST_SEARCH_ANIME_FAILED:
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
