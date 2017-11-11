import {
  REQUEST_ANIMES_LIST,
  RECIEVE_ANIMES_LIST_DATA,
  REQUEST_ANIMES_LIST_FAILED,
  REQUEST_NEXT_ANIMES_LIST,
} from 'actions/animeListCreator';

/**
 * App's initial state, Redux will use these values
 * to bootstrap our app, before having a generated state.
 */
const initialStateAnimeList = {
  isFeching: false,
  animes: [],
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
export default function animeList(state = initialStateAnimeList, action) {
  switch (action.type) {
    case REQUEST_ANIMES_LIST:
    case REQUEST_NEXT_ANIMES_LIST:
      return {
        ...state,
        isFeching: true,
        error: false,
        errorMessage: '',
      };
    case RECIEVE_ANIMES_LIST_DATA:
      return {
        ...state,
        isFeching: false,
        animes: [...state.animes, ...action.payload.animes],
        error: false,
        errorMessage: '',
      };
    case REQUEST_ANIMES_LIST_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
