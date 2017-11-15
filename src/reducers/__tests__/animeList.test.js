import * as animeListCreator from 'actions/animeListCreators';

import animeList from '../animeList';

describe('anime list reduces', () => {
  it('should return the default state', () => {
    const initialStateAnimeList = {
      isFeching: false,
      animes: [],
      error: false,
      errorMessage: '',
      nextPageUrl: '',
    };
    expect(animeList(undefined, {})).toEqual(initialStateAnimeList);
  });

  it('should handle `REQUEST_ANIMES_LIST` and `REQUEST_NEXT_ANIMES_LIST`', () => {
    const state = Object.freeze({
      isFeching: false,
      error: false,
      errorMessage: '',
      animes: [],
    });

    const expected = {
      isFeching: true,
      error: false,
      errorMessage: '',
      animes: [],
    };

    expect(animeList(state, animeListCreator.requestAnimes())).toEqual(expected);
    expect(animeList(state, animeListCreator.requestNextpage())).toEqual(expected);
  });

  it('should handle `RECIEVE_ANIMES_LIST_DATA`', () => {
    const state = Object.freeze({
      isFeching: true,
      error: false,
      errorMessage: '',
      animes: [],
    });

    const animes = [
      {
        id: '1',
        type: 'anime',
      },
      {
        id: '2',
        type: 'ova',
      },
    ];

    const expected = {
      isFeching: false,
      error: false,
      errorMessage: '',
      animes,
    };

    expect(animeList(state, animeListCreator.receiveAnime(animes))).toEqual(expected);
  });

  it('should handle `REQUEST_ANIMES_LIST_FAILED`', () => {
    const errMsg = 'URL not found';

    const state = Object.freeze({
      isFeching: true,
      error: false,
      errorMessage: '',
      animes: [],
    });

    const expected = {
      isFeching: false,
      error: true,
      errorMessage: new Error(errMsg),
      animes: [],
    };
    expect(animeList(state, animeListCreator.requestFailed(errMsg))).toEqual(expected);
  });

  it('should handle `SET_NEXT_ANIMES_LIST_PAGE_URL`', () => {
    const nextPageUrl = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=15&page%5Boffset%5D=15';
    const expected = {
      isFeching: false,
      error: false,
      errorMessage: '',
      animes: [],
      nextPageUrl,
    };

    expect(
      animeList(undefined, animeListCreator.setNextAnimesListPage(nextPageUrl)),
    ).toEqual(expected);
  });
});
