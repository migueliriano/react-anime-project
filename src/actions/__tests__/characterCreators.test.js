import charactersFetchMock from '../__fixtures__/characters';
import BASE_API_URL from '../constants';

import * as actionCreators from '../characterCreators';

describe('characters action creators', () => {
  it('should create an action to request anime characters', () => {
    const expected = {
      type: actionCreators.REQUEST_ANIME_CHARACTERS,
      text: 'Request Anime Characters',
    };
    expect(actionCreators.requestCharacters()).toEqual(expected);
  });

  it('should create an action to recieve anime characters', () => {
    const characters = charactersFetchMock;

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

describe('character Creators const functions string', () => {
  it('should return a single chracter API url by id', () => {
    const characterId = 1;
    const expected = `${BASE_API_URL}anime-characters/${characterId}/character`;
    expect(actionCreators.singleCharacterUrl(characterId)).toEqual(expected);
  });
});
