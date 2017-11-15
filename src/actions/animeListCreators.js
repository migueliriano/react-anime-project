import BASE_API_URL from './constants';

/** @export const @type {string} */
export const REQUEST_ANIMES_LIST = 'REQUEST_ANIMES_LIST';

/** @export const @type {string} */
export const RECIEVE_ANIMES_LIST_DATA = 'RECIEVE_ANIMES_LIST_DATA';

/** @export const @type {string} */
export const REQUEST_ANIMES_LIST_FAILED = 'REQUEST_ANIMES_LIST_FAILED';

/** @export const @type {string} */
export const REQUEST_NEXT_ANIMES_LIST = 'REQUEST_NEXT_ANIMES_LIST';

/** @export const @type {string} */
export const SET_NEXT_ANIMES_LIST_PAGE_URL = 'SET_NEXT_ANIMES_LIST_PAGE_URL';

/** @export const @type {string} */
export const ANIMELIST_URL = `${BASE_API_URL}anime?page[limit]=15`;

/**
 * Return object to execute the action `REQUEST_ANIMES_LIST`
 *
 * @return {object}
 */
export const requestAnimes = () => (
  {
    type: REQUEST_ANIMES_LIST,
    text: 'Request Anime List',
  }
);

/**
 * Return object to execute the action `REQUEST_ANIMES_LIST_FAILED`
 *
 * @param {string} errMsg
 *
 * @return {object}
 */
export const requestFailed = errMsg => (
  {
    type: REQUEST_ANIMES_LIST_FAILED,
    text: 'Request Anime List Failed',
    payload: new Error(errMsg),
  }
);

/**
 * Returns object to execute the action `RECIEVE_ANIMES_LIST_DATA`
 *
 * @param {array<object>} animes - all animes list from the api request
 *
 * @returns {object}
 */
export const receiveAnime = animes => (
  {
    type: RECIEVE_ANIMES_LIST_DATA,
    text: 'Received Anime List Page',
    payload: {
      animes,
    },
  }
);

/**
 * Returns object to execute the action `REQUEST_NEXT_ANIMES_LIST`
 *
 * @return {object}
 */
export const requestNextpage = () => (
  {
    type: REQUEST_NEXT_ANIMES_LIST,
    text: 'Request Next Anime list Page',
  }
);

/**
 * Returns object to execute the action `SET_NEXT_ANIMES_LIST_PAGE_URL`
 * @param {nextPageUrl} - Url to get the Next Page of Anime List
 * @return {object}
 */
export const setNextAnimesListPage = nextPageUrl => (
  {
    type: SET_NEXT_ANIMES_LIST_PAGE_URL,
    text: 'Request Next Anime list Page',
    payload: {
      nextPageUrl,
    },
  }
);
