import * as singleAnimeCreator from 'actions/singleAnimeCreators';

import singleAnime from '../singleAnime';

describe('characters reducers', () => {
  it('should return the default state', () => {
    const initialStateAnimeList = {
      isFeching: false,
      anime: {},
      error: false,
      errorMessage: '',
    };
    expect(singleAnime(undefined, {})).toEqual(initialStateAnimeList);
  });

  it('should handle `REQUEST_SINGLE_ANIME`', () => {
    const state = Object.freeze({
      isFeching: false,
      anime: {},
      error: false,
      errorMessage: '',
    });

    const expected = {
      isFeching: true,
      anime: {},
      error: false,
      errorMessage: '',
    };

    expect(singleAnime(state, singleAnimeCreator.requestSingleAnime())).toEqual(expected);
  });

  it('should handle `RECIEVE_SINGLE_ANIME_DATA`', () => {
    const state = Object.freeze({
      isFeching: true,
      anime: {},
      error: false,
      errorMessage: '',
    });

    const anime = {
      id: '1',
      type: 'anime',
    };

    const expected = {
      isFeching: false,
      anime,
      error: false,
      errorMessage: '',
    };

    expect(singleAnime(state, singleAnimeCreator.receiveSingleAnime(anime)))
      .toEqual(expected);
  });


  it('should handle `REQUEST_SINGLE_ANIME_FAILED`', () => {
    const errMsg = 'URL not found';

    const state = Object.freeze({
      isFeching: true,
      anime: {},
      error: false,
      errorMessage: '',
    });

    const expected = {
      isFeching: false,
      anime: {},
      error: true,
      errorMessage: new Error(errMsg),
    };

    expect(singleAnime(state, singleAnimeCreator.requestSingleAnimeFailed(errMsg)))
      .toEqual(expected);
  });
});
