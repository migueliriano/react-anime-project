import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actionCreators from '../animeListCreators';
import * as actions from '../animeList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions anime list ', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates RECIEVE_ANIMES_LIST_DATA and RECIEVE_ANIMES_LIST_DATA when feching animes has been done', () => {
    const fetchResponse = {
      data: [
        {
          id: '1',
          type: 'anime',
        },
        {
          id: '2',
          type: 'ova',
        },
      ],
    };

    const fetchHeader = { 'content-type': 'application/json' };

    fetchMock
      .getOnce(actionCreators.ANIMELIST_URL, fetchResponse, fetchHeader);

    const receiveAnimeAction = actionCreators.receiveAnime(fetchResponse.data);
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
});
