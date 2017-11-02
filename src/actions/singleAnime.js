import BASE_API_URL from './constants';

export const REQUEST_SINGLE_ANIME = 'REQUEST_SINGLE_ANIME';
export const RECIEVE_SINGLE_ANIME_DATA = 'RECIEVE_SINGLE_ANIME_DATA';
export const REQUEST_SINGLE_ANIME_FAILED = 'REQUEST_SINGLE_ANIME_FAILED';

export const REQUEST_ANIME_CHARACTERS = 'REQUEST_ANIME_CHARACTERS';
export const RECIEVE_ANIME_CHARACTERS_DATA = 'RECIEVE_ANIME_CHARACTERS_DATA';
export const REQUEST_ANIME_CHARACTERS_FAILED = 'REQUEST_ANIME_CHARACTERS_FAILED';


export const requestSingleAnime = () => (
  {
    type: REQUEST_SINGLE_ANIME,
    payload: {
      text: 'Request Single Anime',
    },
  }
);

export const requestSingleAnimeFailed = errMsg => (
  {
    type: REQUEST_SINGLE_ANIME_FAILED,
    text: 'Request Single Anime Failed',
    payload: new Error(errMsg),
  }
);

export const receiveSingleAnime = anime => (
  {
    type: RECIEVE_SINGLE_ANIME_DATA,
    text: 'Receive Single Anime',
    payload: {
      anime,
    },
  }
);

export const requestCharacters = () => (
  {
    text: 'Request Anime Characters',
    type: REQUEST_ANIME_CHARACTERS,
  }
);

export const receiveCharacters = characters => (
  {
    type: RECIEVE_ANIME_CHARACTERS_DATA,
    text: 'Received Anime Characters List Page',
    payload: {
      characters,
    },
  }
);

export const requestCharacterFailed = errMsg => (
  {
    type: REQUEST_ANIME_CHARACTERS_FAILED,
    text: 'Request Anime Characters Failed',
    payload: new Error(errMsg),
  }
);

export const fetchCharacters = (characters, limit = 7) => async (dispatch) => {
  dispatch(requestCharacters());

  try {
    const charactersFetchs = [];
    const sliceCharacters = characters.slice(0, limit);

    sliceCharacters.forEach(({ id }) => {
      const fetchsUrl = fetch(`https://kitsu.io/api/edge/anime-characters/${id}/character`);
      charactersFetchs.push(fetchsUrl);
    });

    const charactersData = await Promise.all(charactersFetchs)
      .then(responsesPromise => Promise.all(responsesPromise.map(response => response.json())))
      .then(responseJson => responseJson);

    dispatch(receiveCharacters(charactersData));
  } catch (error) {
    dispatch(requestCharacterFailed(error));
  }
};

export const fetchSingleAnime = animeId => async (dispatch, getState) => {
  if (getState().singleAnime.anime.id === animeId) {
    return;
  }
  dispatch(requestSingleAnime());
  try {
    const response = await fetch(`${BASE_API_URL}anime/${animeId}?include=animeCharacters`);
    const anime = await response.json();
    dispatch(receiveSingleAnime(anime.data));
    const { relationships } = anime.data;
    dispatch(fetchCharacters(relationships.animeCharacters.data));
  } catch (error) {
    dispatch(requestSingleAnimeFailed(error));
  }
};
