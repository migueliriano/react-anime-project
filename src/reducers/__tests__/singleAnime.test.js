import * as singleAnimeCreator from 'actions/singleAnimeCreators';

import singleAnime from '../singleAnime';

const initialStateAnimeList = Object.freeze({
  isFeching: false,
  anime: {},
  error: false,
  errorMessage: '',
});

describe('characters reducers', () => {
  it('should return the default state', () => {
    expect(singleAnime(undefined, {})).toEqual(initialStateAnimeList);
  });

  it('should handle `REQUEST_SINGLE_ANIME`', () => {
    const state = Object.freeze({
      ...initialStateAnimeList,
      isFeching: false,
    });

    const expected = {
      ...initialStateAnimeList,
      isFeching: true,
    };

    expect(singleAnime(state, singleAnimeCreator.requestSingleAnime())).toEqual(expected);
  });

  it('should handle `RECIEVE_SINGLE_ANIME_DATA`', () => {
    const state = Object.freeze({
      ...initialStateAnimeList,
      isFeching: true,
    });

    const anime = {
      id: '1',
      type: 'anime',
    };

    const expected = {
      ...initialStateAnimeList,
      anime,
    };

    expect(singleAnime(state, singleAnimeCreator.receiveSingleAnime(anime)))
      .toEqual(expected);
  });


  it('should handle `REQUEST_SINGLE_ANIME_FAILED`', () => {
    const errMsg = 'URL not found';

    const state = Object.freeze({
      ...initialStateAnimeList,
      isFeching: true,
    });

    const expected = {
      ...initialStateAnimeList,
      error: true,
      errorMessage: new Error(errMsg),
    };

    expect(singleAnime(state, singleAnimeCreator.requestSingleAnimeFailed(errMsg)))
      .toEqual(expected);
  });
});
