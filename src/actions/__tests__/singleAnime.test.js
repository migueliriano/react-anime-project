import * as actionCreators from '../singleAnimeCreators';
import * as animesMock from '../__fixtures__/animes';

import fetchSingleAnime from '../singleAnime';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../characters', () => jest.fn(() => () => false));

describe('async actions Single Anime', () => {
  beforeEach(() => {
    jest.resetModules();
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates REQUEST_SINGLE_ANIME and RECIEVE_SINGLE_ANIME_DATA when feching single anime' +
  'has been done `fetchSingleAnime`', () => {
    const animeId = 1;
    const fetchHeader = { 'content-type': 'application/json' };

    fetchMock.getOnce(
      actionCreators.singleAnimeUrl(animeId),
      animesMock.singleAnimeWithChacractersFetchResponse,
      fetchHeader,
    );

    const requestSingleAnimeAction = actionCreators.requestSingleAnime();
    const receiveSingleAnimeAction = actionCreators.receiveSingleAnime(
      animesMock.singleAnimeWithChacractersFetchResponse.data,
    );

    const expecteActions = [
      requestSingleAnimeAction,
      receiveSingleAnimeAction,
    ];

    const store = mockStore({
      singleAnime: {
        anime: {
          id: 0,
        },
      },
    });

    store.dispatch(fetchSingleAnime(animeId)).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });

  it('should return `false` when single Anime has data on `fetchSingleAnime`', () => {
    const animeId = 1;

    const store = mockStore({
      singleAnime: {
        anime: {
          id: animeId,
        },
      },
    });

    store.dispatch(fetchSingleAnime(animeId)).then((result) => {
      expect(store.getActions()).toEqual([]);
      expect(result).toBeFalsy();
    });
  });

  it('creates REQUEST_SINGLE_ANIME and  REQUEST_SINGLE_ANIME_FAILED action when ' +
  '`fetchSingleAnime`', () => {
    const animeId = 1;
    const fetchHeader = { 'content-type': 'application/json' };
    const msgError = 'Error Message: not found';

    const store = mockStore({
      singleAnime: {
        anime: {
          id: 0,
        },
      },
    });

    fetchMock.getOnce(actionCreators.singleAnimeUrl(animeId), { throws: msgError }, fetchHeader);

    const requestSingleAnime = actionCreators.requestSingleAnime();
    const requestSingleAnimeFailed = actionCreators.requestSingleAnimeFailed(msgError);

    const expecteActions = [
      requestSingleAnime,
      requestSingleAnimeFailed,
    ];

    store.dispatch(fetchSingleAnime(animeId)).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });
});
