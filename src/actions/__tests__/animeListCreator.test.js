import * as actionCreator from '../animeListCreator';

describe('Anime list cretor actions', () => {
  it('should create an action to request anime list', () => {
    const expected = {
      type: actionCreator.REQUEST_ANIMES_LIST,
      text: 'Request Anime List',
    };
    expect(actionCreator.requestAnimes()).toEqual(expected);
  });

  it('should create an action to request anime list failed', () => {
    const errMsg = 'url Not Found';

    const expected = {
      type: actionCreator.REQUEST_ANIMES_LIST_FAILED,
      text: 'Request Anime List Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreator.requestFailed(errMsg)).toEqual(expected);
  });

  it('should create an action to receive Anime', () => {
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
      type: actionCreator.RECIEVE_ANIMES_LIST_DATA,
      text: 'Received Anime List Page',
      payload: {
        animes,
      },
    };

    expect(actionCreator.receiveAnime(animes)).toEqual(expected);
  });

  it('should create an action to request next anime list page', () => {
    const expected = {
      type: actionCreator.REQUEST_NEXT_ANIMES_LIST,
      text: 'Request Next Anime list Page',
    };

    expect(actionCreator.requestNextpage()).toEqual(expected);
  });
});
