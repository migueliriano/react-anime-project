import fetchCharacters from '../characters';
import {
  charactersAnimeRelationships,
  fetchCharactersResponse,
} from '../__fixtures__/characters';

import * as actionCreators from '../characterCreators';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('async actions characters', () => {
  beforeEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates REQUEST_ANIME_CHARACTERS and RECIEVE_ANIME_CHARACTERS_DATA' +
  'actions when call `fetchCharacters` and return the default limit character', () => {
    const defaultLimit = 7;
    const fetchHeader = { 'content-type': 'application/json' };
    const sliceCharacters = charactersAnimeRelationships.slice(0, defaultLimit);
    const sliceFetchResponse = fetchCharactersResponse.slice(0, defaultLimit);

    sliceCharacters.forEach(({ id }, index) => {
      fetchMock.getOnce(
        actionCreators.singleCharacterUrl(id),
        sliceFetchResponse[index],
        fetchHeader,
      );
    });

    const requestCharacters = actionCreators.requestCharacters();
    const receiveCharacters = actionCreators.receiveCharacters(sliceFetchResponse);

    const expecteActions = [
      requestCharacters,
      receiveCharacters,
    ];

    const store = mockStore({});

    store.dispatch(fetchCharacters(charactersAnimeRelationships)).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });

  it('creates REQUEST_ANIME_CHARACTERS and RECIEVE_ANIME_CHARACTERS_DATA' +
  'actions when call `fetchCharacters` and return the limit character', () => {
    const limit = 9;
    const fetchHeader = { 'content-type': 'application/json' };
    const sliceCharacters = charactersAnimeRelationships.slice(0, limit);
    const sliceFetchResponse = fetchCharactersResponse.slice(0, limit);

    sliceCharacters.forEach(({ id }, index) => {
      fetchMock.getOnce(
        actionCreators.singleCharacterUrl(id),
        sliceFetchResponse[index],
        fetchHeader,
      );
    });

    const requestCharacters = actionCreators.requestCharacters();
    const receiveCharacters = actionCreators.receiveCharacters(sliceFetchResponse);

    const expecteActions = [
      requestCharacters,
      receiveCharacters,
    ];

    const store = mockStore({});

    store.dispatch(fetchCharacters(charactersAnimeRelationships, limit)).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });

  it('creates REQUEST_ANIME_CHARACTERS and REQUEST_ANIME_CHARACTERS_FAILED' +
  'actions when call `fetchCharacters`', () => {
    const fetchHeader = { 'content-type': 'application/json' };
    const msgError = 'Error Message: not found';

    charactersAnimeRelationships.forEach(({ id }) => {
      fetchMock.getOnce(actionCreators.singleCharacterUrl(id), { throws: msgError }, fetchHeader);
    });

    const requestCharacters = actionCreators.requestCharacters();
    const requestCharacterFailed = actionCreators.requestCharacterFailed(msgError);

    const expecteActions = [
      requestCharacters,
      requestCharacterFailed,
    ];

    const store = mockStore({});

    store.dispatch(fetchCharacters(charactersAnimeRelationships)).then(() => {
      expect(store.getActions()).toEqual(expecteActions);
    });
  });
});
