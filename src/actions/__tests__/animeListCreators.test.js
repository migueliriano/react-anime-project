import * as animeMocks from '../__mocks__/animes';

import * as actionCreators from '../animeListCreators';

describe('Anime list cretor actions', () => {
  it('should create an action to request anime list', () => {
    const expected = {
      type: actionCreators.REQUEST_ANIMES_LIST,
      text: 'Request Anime List',
    };
    expect(actionCreators.requestAnimes()).toEqual(expected);
  });

  it('should create an action to request anime list failed', () => {
    const errMsg = 'url Not Found';

    const expected = {
      type: actionCreators.REQUEST_ANIMES_LIST_FAILED,
      text: 'Request Anime List Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreators.requestFailed(errMsg)).toEqual(expected);
  });

  it('should create an action to receive Anime', () => {
    const animes = animeMocks.animeListFetchResponse.data;

    const expected = {
      type: actionCreators.RECIEVE_ANIMES_LIST_DATA,
      text: 'Received Anime List Page',
      payload: {
        animes,
      },
    };

    expect(actionCreators.receiveAnime(animes)).toEqual(expected);
  });

  it('should create an action to request next anime list page', () => {
    const expected = {
      type: actionCreators.REQUEST_NEXT_ANIMES_LIST,
      text: 'Request Next Anime list Page',
    };

    expect(actionCreators.requestNextpage()).toEqual(expected);
  });
});
