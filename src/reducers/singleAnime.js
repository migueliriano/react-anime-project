import {
  REQUEST_SINGLE_ANIME,
  RECIEVE_SINGLE_ANIME_DATA,
  REQUEST_SINGLE_ANIME_FAILED,
} from 'actions/singleAnimeCreators';

/**
 * App's initial state, Redux will use these values
 * to bootstrap our app, before having a generated state.
 *
 * @type {object}
 */
const initialStateSingleAnime = {
  isFeching: false,
  anime: {},
  error: false,
  errorMessage: '',
};

/**
 * Reducer - this part is in charge of changing the global state
 *
 * @typedef {object} initialStateSingleAnime
 *
 * @param {Object=initialStateSingleAnime} state  - App's current state.
 * @param {object}  action - This has the action will be Fired.
 * @returns {Object} Returns the app's new state.
 */
export default function singleAnime(state = initialStateSingleAnime, action) {
  switch (action.type) {
    case REQUEST_SINGLE_ANIME:
      return {
        ...state,
        isFeching: true,
      };
    case RECIEVE_SINGLE_ANIME_DATA:
      return {
        ...state,
        isFeching: false,
        anime: { ...action.payload.anime },
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
