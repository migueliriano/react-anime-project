
import BASE_API_URL from './constants';

/** @export const @type {string} */
export const REQUEST_ANIME_CHARACTERS = 'REQUEST_ANIME_CHARACTERS';

/** @export const @type {string} */
export const RECIEVE_ANIME_CHARACTERS_DATA = 'RECIEVE_ANIME_CHARACTERS_DATA';

/** @export const @type {string} */
export const REQUEST_ANIME_CHARACTERS_FAILED = 'REQUEST_ANIME_CHARACTERS_FAILED';

/**
 * @export const @type {func}
 *
 * @param {int} id - Character id.

 * @return {string} Url to fetch a single character
 */
export const singleCharacterUrl = id => `${BASE_API_URL}anime-characters/${id}/character`;

/**
 * Return object to execute the action `REQUEST_ANIME_CHARACTERS`
 *
 * @return {object}
 */
export const requestCharacters = () => (
  {
    type: REQUEST_ANIME_CHARACTERS,
    text: 'Request Anime Characters',
  }
);

/**
 *
 * @param {array<object>} characters - all characters list from the api request
 *
 * @return {object}
 */
export const receiveCharacters = characters => (
  {
    type: RECIEVE_ANIME_CHARACTERS_DATA,
    text: 'Received Anime Characters List Page',
    payload: {
      characters,
    },
  }
);

/**
 * Return object to execute the action `REQUEST_ANIME_CHARACTERS_FAILED`
 *
 * @param {string} errMsg - Error Message
 *
 * @return {object}
 */
export const requestCharacterFailed = errMsg => (
  {
    type: REQUEST_ANIME_CHARACTERS_FAILED,
    text: 'Request Anime Characters Failed',
    payload: new Error(errMsg),
  }
);
