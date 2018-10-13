import {
  requestSearchAnimes,
  requestSearchAnimeFailed,
  receiveSearchAnime,
  searchAnimeUrl,
} from './searchAnimeCreators';

/**
 *
 * @param {int} animeName - Anime Name to fetch
 *
 * @return {array|string|bool} Return an array of object of all character or an error if the
 * request failed or return false if the data already exists.
 */
const fetchSearchAnime = animeName => async (dispatch, getState) => {
  dispatch(requestSearchAnimes());
  try {
    const response = await fetch(searchAnimeUrl(animeName));
    const animes = await response.json();
    dispatch(receiveSearchAnime(animes.data));
    return animes.data;
  } catch (error) {
    dispatch(requestSearchAnimeFailed(error));
    return error;
  }
};

export default fetchSearchAnime;
