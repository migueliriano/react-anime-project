import BASE_API_URL from './constants';

export const REQUEST_ANIMES_LIST = 'REQUEST_ANIMES_LIST';
export const RECIEVE_ANIMES_LIST_DATA = 'RECIEVE_ANIMES_LIST_DATA';
export const REQUEST_ANIMES_LIST_FAILED = 'REQUEST_ANIMES_LIST_FAILED';
export const REQUEST_NEXT_ANIMES_LIST = 'REQUEST_NEXT_ANIMES_LIST';
export const ANIMELIST_URL = `${BASE_API_URL}anime?page[limit]=15`;

let nextPageUrl = '';

export const requestAnimes = () => (
  {
    type: REQUEST_ANIMES_LIST,
    text: 'Request Anime List',
  }
);

export const requestFailed = errMsg => (
  {
    type: REQUEST_ANIMES_LIST_FAILED,
    text: 'Request Anime List Failed',
    payload: new Error(errMsg),
  }
);

export const receiveAnime = animes => (
  {
    type: RECIEVE_ANIMES_LIST_DATA,
    text: 'Received Anime List Page',
    payload: {
      animes,
    },
  }
);

export const requestNextpage = () => (
  {
    type: REQUEST_NEXT_ANIMES_LIST,
    text: 'Request Next Anime list Page',
  }
);

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

export const fetchAnimesListIfIsNeeded = () => async (dispatch, getState) => {
  if (!getState().animeList.animes.length) {
    const respose = await fetchRequest(dispatch, ANIMELIST_URL, () => requestAnimes());
    nextPageUrl = respose.links.next;
  }
};

export function fetchNextPageAnimeList() {
  return async (dispatch) => {
    const respose = await fetchRequest(dispatch, nextPageUrl, () => requestNextpage());
    nextPageUrl = respose.links.next;
  };
}
