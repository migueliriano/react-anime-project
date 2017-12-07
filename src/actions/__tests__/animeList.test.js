import * as animeMocks from '../__fixtures__/animes';
import * as actionCreators from '../animeListCreators';
import * as actions from '../animeList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions anime list ', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates REQUEST_ANIMES_LIST and RECIEVE_ANIMES_LIST_DATA when feching animes' +
  'has been done', () => {
    const fetchHeader = { 'content-type': 'application/json' };

    fetchMock
      .getOnce(actionCreators.ANIMELIST_URL, animeMocks.animeListFetchResponse, fetchHeader);

    const receiveAnimeAction = actionCreators.receiveAnime(animeMocks.animeListFetchResponse.data);
    const requestAnimeAction = actionCreators.requestAnimes();

    const expecteActions = [
      requestAnimeAction,
      receiveAnimeAction,
    ];

    const store = mockStore({});

    return actions.fetchRequest(
      store.dispatch,
      actionCreators.ANIMELIST_URL,
      actionCreators.requestAnimes).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });


  it('creates REQUEST_ANIMES_LIST and REQUEST_ANIMES_LIST_FAILED when feching animes has been' +
  'failed', () => {
    const fetchHeader = { 'content-type': 'application/json' };
    const wrongUrl = 'http://wrong_url-test.test';
    const msgError = 'Error Message: not found';

    fetchMock
      .getOnce(wrongUrl, { throws: msgError }, fetchHeader);

    const requestAnimeAction = actionCreators.requestAnimes();
    const requestFailed = actionCreators.requestFailed(msgError);

    const expecteActions = [
      requestAnimeAction,
      requestFailed,
    ];

    const store = mockStore({});

    return actions.fetchRequest(
      store.dispatch,
      wrongUrl,
      actionCreators.requestAnimes).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });


  it('should Not fetch request of animeList if we already have animes in the store', () => {
    const fetchHeader = { 'content-type': 'application/json' };

    fetchMock
      .getOnce(actionCreators.ANIMELIST_URL, animeMocks.animeListFetchResponse, fetchHeader);

    const store = mockStore({
      animeList: {
        animes: animeMocks.animeListFetchResponse.data,
      },
    });

    store.dispatch(actions.fetchAnimesListIfIsNeeded());

    expect(fetchMock.called()).toBeFalsy();
  });

  it('creates RECIEVE_ANIMES_LIST_DATA, REQUEST_NEXT_ANIMES_LIST and SET_NEXT_ANIMES_LIST_PAGE_URL'
    + 'when feching first time anime list', () => {
    const fetchHeader = { 'content-type': 'application/json' };

    fetchMock
      .getOnce(actionCreators.ANIMELIST_URL, animeMocks.animeListFetchResponse, fetchHeader);

    const requestAnimes = actionCreators.requestAnimes();
    const setNextAnimesListPage = actionCreators.setNextAnimesListPage(
      animeMocks.animeListFetchResponse.links.next,
    );
    const receiveAnime = actionCreators.receiveAnime(animeMocks.animeListFetchResponse.data);
    const expecteActions = [
      requestAnimes,
      receiveAnime,
      setNextAnimesListPage,
    ];

    const store = mockStore({
      animeList: {
        animes: [],
      },
    });
    store.dispatch(actions.fetchAnimesListIfIsNeeded())
      .then(() => {
        expect(store.getActions()).toEqual(expecteActions);
      });
  });

  it('creates RECIEVE_ANIMES_LIST_DATA, REQUEST_NEXT_ANIMES_LIST and SET_NEXT_ANIMES_LIST_PAGE_URL'
    + 'when feching next animes list page has been done', () => {
    const fetchHeader = { 'content-type': 'application/json' };
    const nextPageUrl = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=15&page%5Boffset%5D=15';

    fetchMock
      .getOnce(nextPageUrl, animeMocks.animeListFetchResponse, fetchHeader);

    const requestNextpage = actionCreators.requestNextpage();
    const setNextAnimesListPage = actionCreators.setNextAnimesListPage(
      animeMocks.animeListFetchResponse.links.next,
    );
    const receiveAnime = actionCreators.receiveAnime(animeMocks.animeListFetchResponse.data);
    const expecteActions = [
      requestNextpage,
      receiveAnime,
      setNextAnimesListPage,
    ];

    const store = mockStore({
      animeList: {
        nextPageUrl,
      },
    });

    return store.dispatch(actions.fetchNextPageAnimeList())
      .then(() => {
        expect(store.getActions()).toEqual(expecteActions);
      });
  });
});
