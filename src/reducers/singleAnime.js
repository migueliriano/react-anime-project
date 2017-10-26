import {
  REQUEST_SINGLE_ANIME,
  RECIEVE_SINGLE_ANIME_DATA,
  REQUEST_SINGLE_ANIME_FAILED,
} from 'actions/singleAnime';

const initialStateAnimeList = {
  isFeching: false,
  anime: {},
  error: false,
  errorMessage: '',
};

export default function singleAnime(state = initialStateAnimeList, action) {
  switch (action.type) {
    case REQUEST_SINGLE_ANIME:
      return {
        ...state,
        isFeching: true,
        error: false,
        errorMessage: '',
      };
    case RECIEVE_SINGLE_ANIME_DATA:
      return {
        ...state,
        isFeching: false,
        anime: { ...action.payload.anime },
        error: false,
        errorMessage: '',
      };
    case REQUEST_SINGLE_ANIME_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
