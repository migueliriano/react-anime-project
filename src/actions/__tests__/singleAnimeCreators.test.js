import * as actionCreators from '../singleAnimeCreators';

import BASE_API_URL from '../constants';

describe('single anime actions creator', () => {
  it('should create an action to request a single anime', () => {
    const expected = {
      type: actionCreators.REQUEST_SINGLE_ANIME,
      payload: {
        text: 'Request Single Anime',
      },
    };
    expect(actionCreators.requestSingleAnime()).toEqual(expected);
  });

  it('should create an action to request a single anime failed', () => {
    const errMsg = 'url Not Found';

    const expected = {
      type: actionCreators.REQUEST_SINGLE_ANIME_FAILED,
      text: 'Request Single Anime Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreators.requestSingleAnimeFailed(errMsg)).toEqual(expected);
  });

  it('should create an action to receive a single anime object', () => {
    const anime = {
      id: '1',
      type: 'anime',
    };

    const expected = {
      type: actionCreators.RECIEVE_SINGLE_ANIME_DATA,
      text: 'Receive Single Anime',
      payload: {
        anime,
      },
    };
    expect(actionCreators.receiveSingleAnime(anime)).toEqual(expected);
  });

  it('should create an action to request anime characters', () => {
    const expected = {
      type: actionCreators.REQUEST_ANIME_CHARACTERS,
      text: 'Request Anime Characters',
    };
    expect(actionCreators.requestCharacters()).toEqual(expected);
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
      type: actionCreators.RECIEVE_ANIME_CHARACTERS_DATA,
      text: 'Received Anime Characters List Page',
      payload: {
        characters,
      },
    };
    expect(actionCreators.receiveCharacters(characters)).toEqual(expected);
  });

  it('should create an action to request character failed', () => {
    const errMsg = 'URL not found';

    const expected = {
      type: actionCreators.REQUEST_ANIME_CHARACTERS_FAILED,
      text: 'Request Anime Characters Failed',
      payload: new Error(errMsg),
    };
    expect(actionCreators.requestCharacterFailed(errMsg)).toEqual(expected);
  });
});

describe('single anime const functions string', () => {
  it('should return a single anime API url by id', () => {
    const animeId = 1;
    const expected = `${BASE_API_URL}anime/${animeId}?include=animeCharacters`;
    expect(actionCreators.singleAnimeUrl(animeId)).toEqual(expected);
  });

  it('should return a single chracter API url by id', () => {
    const characterId = 1;
    const expected = `${BASE_API_URL}anime-characters/${characterId}/character`;
    expect(actionCreators.singleCharacterUrl(characterId)).toEqual(expected);
  });
});
