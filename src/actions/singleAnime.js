import {
  requestSingleAnime,
  requestSingleAnimeFailed,
  receiveSingleAnime,
  requestCharacters,
  receiveCharacters,
  requestCharacterFailed,
  singleAnimeUrl,
  singleCharacterUrl,
} from './singleAnimeCreators.js';

/**
 * Fetch all the character url and return the response of each request as json or an error
 *
 * @param {array<object>} characters - Collection of
 * @param {int=7} limit - Limit of character will be returned by default is 7
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
      const fetchsUrl = fetch(singleCharacterUrl(id));
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
    const response = await fetch(singleAnimeUrl(animeId));
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
