import BASE_API_URL from './constants';

export const REQUEST_SINGLE_ANIME = 'REQUEST_SINGLE_ANIME';
export const RECIEVE_SINGLE_ANIME_DATA = 'RECIEVE_SINGLE_ANIME_DATA';
export const REQUEST_SINGLE_ANIME_FAILED = 'REQUEST_SINGLE_ANIME_FAILED';

export const requestSingleAnime = () => (
  {
    type: REQUEST_SINGLE_ANIME,
    payload: {
      text: 'Request Single Anime',
    },
  }
);

export const requestFailed = errMsg => (
  {
    type: REQUEST_SINGLE_ANIME_FAILED,
    payload: {
      text: 'Request Single Anime Failed',
      errorMessage: new Error(errMsg),
    },
  }
);

export const receiveSingleAnime = anime => (
  {
    type: RECIEVE_SINGLE_ANIME_DATA,
    payload: {
      text: 'Receive Single Anime',
      anime,
    },
  }
);

export const fetchSingleAnime = animeId => async (dispatch) => {
  dispatch(requestSingleAnime());
  try {
    const response = await fetch(`${BASE_API_URL}anime/${animeId}`);
    const anime = await response.json();
    dispatch(receiveSingleAnime(anime.data));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
