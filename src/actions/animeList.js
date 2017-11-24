import {
  requestAnimes,
  requestFailed,
  receiveAnime,
  requestNextpage,
  setNextAnimesListPage,
  ANIMELIST_URL,
} from './animeListCreators';

/**
 * Execute the dispatch action to start the request and handle
 * the response returning the data or an error, calling an action depending the case.
 *
 * @export const @type {function}
 *
 * @param {function} dispatch      - Native function to execute the action.
 * @param {string} url             - URL to make the request
 * @param {function} requestAction - Callback to execute the action to start the request
 *
 * @return {array<object>|string} Returns an array of animes or an error if the request failed
 */
export const fetchRequest = async (dispatch, url, requestAction) => {
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
 * @export const @type {function}
 *
 * @return {function}
 */
export const fetchAnimesListIfIsNeeded = () => async (dispatch, getState) => {
  if (!getState().animeList.animes.length) {
    const respose = await fetchRequest(dispatch, ANIMELIST_URL, requestAnimes);
    dispatch(setNextAnimesListPage(respose.links.next));
  }
};

/**
 * Call `fetchRequest` and send the action to start the request using the the current state
 * `nextPageUrl`
 *
 * @export const @type {function}
 *
 * @return {function}
 */
export const fetchNextPageAnimeList = () => async (dispatch, getState) => {
  const nextPageUrl = getState().animeList.nextPageUrl;
  const respose = await fetchRequest(dispatch, nextPageUrl, requestNextpage);
  dispatch(setNextAnimesListPage(respose.links.next));
};
