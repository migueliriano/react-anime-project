import BASE_API_URL from '../constants';

import * as animeMocks from '../__fixtures__/animes';
import * as actionCreators from '../singleAnimeCreators';

describe('single anime actions creator', () => {
  it('should create an action to request a single anime', () => {
    const expected = {
      type: actionCreators.REQUEST_SINGLE_ANIME,
      payload: {
        text: 'Request Single Anime',
      },
    };
    expect(actionCreators.requestSingleAnime()).toEqual(expected);
  });

  it('should create an action to request a single anime failed', () => {
    const errMsg = 'url Not Found';

    const expected = {
      type: actionCreators.REQUEST_SINGLE_ANIME_FAILED,
      text: 'Request Single Anime Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreators.requestSingleAnimeFailed(errMsg)).toEqual(expected);
  });

  it('should create an action to receive a single anime object', () => {
    const anime = animeMocks.singleAnimeFetchResponse;

    const expected = {
      type: actionCreators.RECIEVE_SINGLE_ANIME_DATA,
      text: 'Receive Single Anime',
      payload: {
        anime,
      },
    };
    expect(actionCreators.receiveSingleAnime(anime)).toEqual(expected);
  });
});

describe('single anime const functions string', () => {
  it('should return a single anime API url by id', () => {
    const animeId = 1;
    const expected = `${BASE_API_URL}anime/${animeId}?include=animeCharacters`;
    expect(actionCreators.singleAnimeUrl(animeId)).toEqual(expected);
  });
});
