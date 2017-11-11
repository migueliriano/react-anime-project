import {
  requestAnimes,
  requestFailed,
  receiveAnime,
  requestNextpage,
  ANIMELIST_URL,
} from './animeListCreator';

/**
 * This variable is used internaly for `fetchNextPageAnimeList`
 * to fetch the next page of the API
 * @type {string}
 */
let nextPageUrl = '';

/**
 * Execute the dispatch action to start the request and handle
 * the response returning the data or an error, calling an action depending the case.
 *
 * @param {function} dispatch      - Native function to execute the action.
 * @param {string} url         - URL to make the request
 * @param {function} requestAction - Callback to execute the action to start the request
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
 * @return {function}
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
 * @return {function}
 */
export const fetchNextPageAnimeList = () => async (dispatch) => {
  const respose = await fetchRequest(dispatch, nextPageUrl, () => requestNextpage());
  nextPageUrl = respose.links.next;
};
