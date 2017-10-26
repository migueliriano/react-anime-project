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
    payload: {
      text: 'Request Anime List',
    },
  }
);

export const requestFailed = errMsg => (
  {
    type: REQUEST_ANIMES_LIST_FAILED,
    payload: {
      text: 'Request Failed',
      errorMessage: new Error(errMsg),
    },
  }
);

export const receiveAnime = animes => (
  {
    type: RECIEVE_ANIMES_LIST_DATA,
    payload: {
      animes,
      text: 'Received Anime List Page',
    },
  }
);

export const requestNextpage = () => (
  {
    type: REQUEST_NEXT_ANIMES_LIST,
    payload: {
      text: 'Request Next Anime list Page',
    },
  }
);

const fetchRequest = async (dispatch, url, requestAction) => {
  dispatch(requestAction());
  try {
    const response = await fetch(url);
    const animes = await response.json();
    nextPageUrl = animes.links.next;
    dispatch(receiveAnime(animes.data));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const fetchAnimesList = () => (dispatch) => {
  fetchRequest(dispatch, ANIMELIST_URL, () => requestAnimes());
};

export function fetchNextPageAnimeList() {
  return (dispatch) => {
    fetchRequest(dispatch, nextPageUrl, () => requestNextpage());
  };
}
