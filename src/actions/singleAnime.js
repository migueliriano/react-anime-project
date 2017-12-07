import fetchCharacters from './characters';

import {
  requestSingleAnime,
  requestSingleAnimeFailed,
  receiveSingleAnime,
  singleAnimeUrl,
} from './singleAnimeCreators';

/**
 *
 * @param {int} animeId - Anime Id to fetch
 *
 * @return {array|string|bool} Return an array of object of all character or an error if the
 * request failed or return false if the data already exists.
 */
const fetchSingleAnime = animeId => async (dispatch, getState) => {
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

export default fetchSingleAnime;
