import {
  REQUEST_ANIMES_LIST,
  RECIEVE_ANIMES_LIST_DATA,
  REQUEST_ANIMES_LIST_FAILED,
  REQUEST_NEXT_ANIMES_LIST,
  SET_NEXT_ANIMES_LIST_PAGE_URL,
} from 'actions/animeListCreators';

/**
 * App's initial state, Redux will use these values
 * to bootstrap our app, before having a generated state.
 *
 * @type {object}
 *
 */
const initialStateAnimeList = {
  isFeching: false,
  animes: [],
  error: false,
  errorMessage: '',
  nextPageUrl: '',
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
      };
    case RECIEVE_ANIMES_LIST_DATA:
      return {
        ...state,
        isFeching: false,
        animes: [...state.animes, ...action.payload.animes],
      };
    case REQUEST_ANIMES_LIST_FAILED:
      return {
        ...state,
        isFeching: false,
        error: true,
        errorMessage: action.payload,
      };
    case SET_NEXT_ANIMES_LIST_PAGE_URL:
      return {
        ...state,
        nextPageUrl: action.payload.nextPageUrl,
      };
    default:
      return state;
  }
}
