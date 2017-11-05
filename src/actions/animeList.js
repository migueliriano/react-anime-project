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
export const ANIMELIST_URL = `${BASE_API_URL}anime?page[limit]=15`;

/** @type {string} */
let nextPageUrl = '';

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
 * Execute the dispatch action to start the request and handle
 * the response returning the data or an error, calling an action depending the case.
 *
 * @param {func} dispatch      - Native function to execute the action.
 * @param {string} url         - URL to make the request
 * @param {func} requestAction - Callback to execute the action to start the request
 *
 * @return {array<object>|string} Returns an array of animes or an error if the request failed
 */
const fetchRequest = async (dispatch, url, requestAction) => {
  dispatch(requestAction());
  try {
    const response = await fetch(url);
    const animes = await response.json();
    dispatch(receiveAnime(animes.data));
    return animes;
  } catch (error) {
    dispatch(requestFailed(error));
    return error;
  }
};

/**
 * Call `fetchRequest` and send the action to start the request using the url
 * in the const `ANIMELIST_URL`
 *
 * @return {func}
 */
export const fetchAnimesListIfIsNeeded = () => async (dispatch, getState) => {
  if (!getState().animeList.animes.length) {
    const respose = await fetchRequest(dispatch, ANIMELIST_URL, () => requestAnimes());
    nextPageUrl = respose.links.next;
  }
};

/**
 * Call `fetchRequest` and send the action to start the request using the url
 * in the variable `nextPageUrl`.
 *
 * @return {func}
 */
export const fetchNextPageAnimeList = () => async (dispatch) => {
  const respose = await fetchRequest(dispatch, nextPageUrl, () => requestNextpage());
  nextPageUrl = respose.links.next;
};
