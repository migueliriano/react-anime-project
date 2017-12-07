import BASE_API_URL from './constants';

/** @export const @type {string} */
export const REQUEST_SINGLE_ANIME = 'REQUEST_SINGLE_ANIME';

/** @export const @type {string} */
export const RECIEVE_SINGLE_ANIME_DATA = 'RECIEVE_SINGLE_ANIME_DATA';

/** @export const @type {string} */
export const REQUEST_SINGLE_ANIME_FAILED = 'REQUEST_SINGLE_ANIME_FAILED';

/**
 * @export const @type {func}
 *
 * @param {int} id - Anime id to fetch data.
 *
 * @return {string} Url to fetch a single anime
 */
export const singleAnimeUrl = id => `${BASE_API_URL}anime/${id}?include=animeCharacters`;

/**
 * Return object to execute the action `REQUEST_SINGLE_ANIME`
 *
 * @return {object}
 */
export const requestSingleAnime = () => (
  {
    type: REQUEST_SINGLE_ANIME,
    payload: {
      text: 'Request Single Anime',
    },
  }
);

/**
 * Return object to execute the action `REQUEST_SINGLE_ANIME_FAILED`
 *
 * @param {string} errMsg - Error Message
 *
 * @return {object}
 */
export const requestSingleAnimeFailed = errMsg => (
  {
    type: REQUEST_SINGLE_ANIME_FAILED,
    text: 'Request Single Anime Failed',
    payload: new Error(errMsg),
  }
);

/**
 * Returns object to execute the action `RECIEVE_SINGLE_ANIME_DATA`
 *
 * @param {object} animes - Single anime from the api request
 *
 * @returns {object}
 */
export const receiveSingleAnime = anime => (
  {
    type: RECIEVE_SINGLE_ANIME_DATA,
    text: 'Receive Single Anime',
    payload: {
      anime,
    },
  }
);
