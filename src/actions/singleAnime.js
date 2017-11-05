import BASE_API_URL from './constants';

/** @export const @type {string} */
export const REQUEST_SINGLE_ANIME = 'REQUEST_SINGLE_ANIME';

/** @export const @type {string} */
export const RECIEVE_SINGLE_ANIME_DATA = 'RECIEVE_SINGLE_ANIME_DATA';

/** @export const @type {string} */
export const REQUEST_SINGLE_ANIME_FAILED = 'REQUEST_SINGLE_ANIME_FAILED';

/** @export const @type {string} */
export const REQUEST_ANIME_CHARACTERS = 'REQUEST_ANIME_CHARACTERS';

/** @export const @type {string} */
export const RECIEVE_ANIME_CHARACTERS_DATA = 'RECIEVE_ANIME_CHARACTERS_DATA';

/** @export const @type {string} */
export const REQUEST_ANIME_CHARACTERS_FAILED = 'REQUEST_ANIME_CHARACTERS_FAILED';

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

/**
 * Return object to execute the action `REQUEST_ANIME_CHARACTERS`
 *
 * @return {object}
 */
export const requestCharacters = () => (
  {
    text: 'Request Anime Characters',
    type: REQUEST_ANIME_CHARACTERS,
  }
);

/**
 *
 * @param {array<object>} characters - all characters list from the api request
 *
 * @return {object}
 */
export const receiveCharacters = characters => (
  {
    type: RECIEVE_ANIME_CHARACTERS_DATA,
    text: 'Received Anime Characters List Page',
    payload: {
      characters,
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
export const requestCharacterFailed = errMsg => (
  {
    type: REQUEST_ANIME_CHARACTERS_FAILED,
    text: 'Request Anime Characters Failed',
    payload: new Error(errMsg),
  }
);

/**
 * Fetch all the character url and return the response of each request as json or an error
 *
 * @param {array<object>} characters - Collection of
 * @param {int=} limit - Limit of character will be returned by default is 7
 *
 * @return {array<object>|string} Return an array of object of all character or an error if the
 * request fail
 */
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

/**
 *
 * @param {int} animeId - Anime Id to fetch
 *
 * @return {array|string} Return an array of object of all character or an error if the 
 * request failed
 */
export const fetchSingleAnime = animeId => async (dispatch, getState) => {
  if (getState().singleAnime.anime.id === animeId) {
    return false;
  }
  dispatch(requestSingleAnime());
  try {
    const response = await fetch(`${BASE_API_URL}anime/${animeId}?include=animeCharacters`);
    const anime = await response.json();
    dispatch(receiveSingleAnime(anime.data));
    const { relationships } = anime.data;
    dispatch(fetchCharacters(relationships.animeCharacters.data));
    return anime.data;
  } catch (error) {
    dispatch(requestSingleAnimeFailed(error));
    return error;
  }
};
