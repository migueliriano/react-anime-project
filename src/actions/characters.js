import {
  requestCharacters,
  receiveCharacters,
  requestCharacterFailed,
  singleCharacterUrl,
} from './characterCreators';

/**
 * Fetch all the character url and return the response of each request as json or an error
 *
 * @param {array<object>} characters - Collection of url character
 * @param {int=7} limit - Limit of character will be returned by default is `7`
 *
 * @return {array<object>|string} Return an array of object of all character or an error if the
 * request fail
 */
const fetchCharacters = (characters, limit = 7) => async (dispatch) => {
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

export default fetchCharacters;
