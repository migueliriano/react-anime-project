import {
  REQUEST_ANIME_CHARACTERS,
  RECIEVE_ANIME_CHARACTERS_DATA,
  REQUEST_ANIME_CHARACTERS_FAILED,
} from 'actions/singleAnime';

const initialAnimeCharacters = {
  isFeching: false,
  characters: [],
  error: false,
  errorMessage: '',
};

export default function animeCharacters(state = initialAnimeCharacters, action) {
  switch (action.type) {
    case REQUEST_ANIME_CHARACTERS:
      return {
        ...state,
        isFeching: true,
        error: false,
      };
    case RECIEVE_ANIME_CHARACTERS_DATA:
      return {
        ...state,
        isFeching: false,
        characters: action.payload.characters,
        error: false,
      };
    case REQUEST_ANIME_CHARACTERS_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
