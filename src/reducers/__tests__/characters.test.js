import * as singleAnimeCreator from 'actions/singleAnimeCreators';

import characters from '../characters';

const initialAnimeCharacters = Object.freeze({
  isFeching: false,
  characters: [],
  error: false,
  errorMessage: '',
});

describe('characters reducers', () => {
  it('should return the default state', () => {
    expect(characters(undefined, {})).toEqual(initialAnimeCharacters);
  });

  it('should handle `REQUEST_ANIME_CHARACTERS`', () => {
    const expected = {
      ...initialAnimeCharacters,
      isFeching: true,
    };

    expect(
      characters(initialAnimeCharacters, singleAnimeCreator.requestCharacters()),
    ).toEqual(expected);
  });

  it('should handle `RECIEVE_ANIME_CHARACTERS_DATA`', () => {
    const state = Object.freeze({
      ...initialAnimeCharacters,
      isFeching: true,
    });

    const charactersData = [
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
      ...initialAnimeCharacters,
      isFeching: false,
      characters: charactersData,
    };

    expect(characters(state, singleAnimeCreator.receiveCharacters(charactersData)))
      .toEqual(expected);
  });


  it('should handle `REQUEST_ANIME_CHARACTERS_FAILED`', () => {
    const errMsg = 'URL not found';

    const state = Object.freeze({
      ...initialAnimeCharacters,
      isFeching: true,
    });

    const expected = {
      ...initialAnimeCharacters,
      error: true,
      errorMessage: new Error(errMsg),
    };

    expect(characters(state, singleAnimeCreator.requestCharacterFailed(errMsg)))
      .toEqual(expected);
  });
});
