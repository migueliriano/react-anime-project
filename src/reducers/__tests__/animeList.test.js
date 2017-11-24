import * as animeListCreator from 'actions/animeListCreators';

import animeList from '../animeList';

const initialStateAnimeList = Object.freeze({
  isFeching: false,
  animes: [],
  error: false,
  errorMessage: '',
  nextPageUrl: '',
});

describe('anime list reduces', () => {
  it('should return the default state', () => {
    expect(animeList(undefined, {})).toEqual(initialStateAnimeList);
  });

  it('should handle `REQUEST_ANIMES_LIST` and `REQUEST_NEXT_ANIMES_LIST`', () => {
    const expected = {
      ...initialStateAnimeList,
      isFeching: true,
    };

    expect(animeList(initialStateAnimeList, animeListCreator.requestAnimes())).toEqual(expected);
    expect(animeList(initialStateAnimeList, animeListCreator.requestNextpage())).toEqual(expected);
  });

  it('should handle `RECIEVE_ANIMES_LIST_DATA`', () => {
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
      ...initialStateAnimeList,
      animes,
    };

    expect(
      animeList(initialStateAnimeList, animeListCreator.receiveAnime(animes)),
    ).toEqual(expected);
  });

  it('should handle `REQUEST_ANIMES_LIST_FAILED`', () => {
    const errMsg = 'URL not found';

    const expected = {
      ...initialStateAnimeList,
      error: true,
      errorMessage: new Error(errMsg),
    };

    expect(
      animeList(initialStateAnimeList, animeListCreator.requestFailed(errMsg)),
    ).toEqual(expected);
  });

  it('should handle `SET_NEXT_ANIMES_LIST_PAGE_URL`', () => {
    const nextPageUrl = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=15&page%5Boffset%5D=15';
    const expected = {
      ...initialStateAnimeList,
      nextPageUrl,
    };

    expect(
      animeList(undefined, animeListCreator.setNextAnimesListPage(nextPageUrl)),
    ).toEqual(expected);
  });
});
