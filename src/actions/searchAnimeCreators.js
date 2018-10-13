import BASE_API_URL from './constants';

/** @export const @type {string} */
export const REQUEST_SEARCH_ANIME = 'REQUEST_SEARCH_ANIME';

/** @export const @type {string} */
export const RECIEVE_SEARCH_ANIME_DATA = 'RECIEVE_SEARCH_ANIME_DATA';

/** @export const @type {string} */
export const REQUEST_SEARCH_ANIME_FAILED = 'REQUEST_SEARCH_ANIME_FAILED';

/**
 * @export const @type {func}
 *
 * @param {int} id - Anime Name to fetch data.
 *
 * @return {string} Url to fetch an Anime List with match with Name
 */
export const searchAnimeUrl = animeName => `${BASE_API_URL}anime/?filter[text]=${animeName}`;

/**
 * Return object to execute the action `REQUEST_SEARCH_ANIME`
 *
 * @return {object}
 */
export const requestSearchAnimes = () => (
  {
    type: REQUEST_SEARCH_ANIME,
    payload: {
      text: 'Request Search Anime',
    },
  }
);

/**
 * Return object to execute the action `REQUEST_SEARCH_ANIME_FAILED`
 *
 * @param {string} errMsg - Error Message
 *
 * @return {object}
 */
export const requestSearchAnimeFailed = errMsg => (
  {
    type: REQUEST_SEARCH_ANIME_FAILED,
    text: 'Request Search Anime Failed',
    payload: new Error(errMsg),
  }
);

/**
 * Returns object to execute the action `RECIEVE_SEARCH_ANIME_DATA`
 *
 * @param {object} animes - Single anime from the api request
 *
 * @returns {object}
 */
export const receiveSearchAnime = animes => (
  {
    type: RECIEVE_SEARCH_ANIME_DATA,
    text: 'Receive Search Anime',
    payload: {
      animes,
    },
  }
);
