import * as actionCreator from '../singleAnimeCreator';

describe('single anime creator actions', () => {
  it('should create an action to request a single anime', () => {
    const expected = {
      type: actionCreator.REQUEST_SINGLE_ANIME,
      payload: {
        text: 'Request Single Anime',
      },
    };
    expect(actionCreator.requestSingleAnime()).toEqual(expected);
  });

  it('should create an action to request a single anime failed', () => {
    const errMsg = 'url Not Found';

    const expected = {
      type: actionCreator.REQUEST_SINGLE_ANIME_FAILED,
      text: 'Request Single Anime Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreator.requestSingleAnimeFailed(errMsg)).toEqual(expected);
  });

  it('should create an action to receive a single anime object', () => {
    const anime = {
      id: '1',
      type: 'anime',
    };

    const expected = {
      type: actionCreator.RECIEVE_SINGLE_ANIME_DATA,
      text: 'Receive Single Anime',
      payload: {
        anime,
      },
    };
    expect(actionCreator.receiveSingleAnime(anime)).toEqual(expected);
  });

  it('should create an action to request anime characters', () => {
    const expected = {
      type: actionCreator.REQUEST_ANIME_CHARACTERS,
      text: 'Request Anime Characters',
    };
    expect(actionCreator.requestCharacters()).toEqual(expected);
  });

  it('should create an action to recieve anime characters', () => {
    const characters = [
      {
        data: {
          id: '1',
          type: 'characters',
        },
      },
      {
        data: {
          id: '2',
          type: 'characters',
        },
      },
    ];

    const expected = {
      type: actionCreator.RECIEVE_ANIME_CHARACTERS_DATA,
      text: 'Received Anime Characters List Page',
      payload: {
        characters,
      },
    };
    expect(actionCreator.receiveCharacters(characters)).toEqual(expected);
  });

  it('should create an action to request character failed', () => {
    const errMsg = 'URL not found';

    const expected = {
      type: actionCreator.REQUEST_ANIME_CHARACTERS_FAILED,
      text: 'Request Anime Characters Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreator.requestCharacterFailed(errMsg)).toEqual(expected);
  });
});
