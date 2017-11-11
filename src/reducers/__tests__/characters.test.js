import * as singleAnimeCreator from 'actions/singleAnimeCreator';

import characters from '../characters';

describe('characters reducers', () => {
  it('should return the default state', () => {
    const initialStateAnimeList = {
      isFeching: false,
      characters: [],
      error: false,
      errorMessage: '',
    };
    expect(characters(undefined, {})).toEqual(initialStateAnimeList);
  });

  it('should handle `REQUEST_ANIME_CHARACTERS`', () => {
    const state = Object.freeze({
      isFeching: false,
      characters: [],
      error: false,
      errorMessage: '',
    });

    const expected = {
      isFeching: true,
      characters: [],
      error: false,
      errorMessage: '',
    };

    expect(characters(state, singleAnimeCreator.requestCharacters())).toEqual(expected);
  });

  it('should handle `RECIEVE_ANIME_CHARACTERS_DATA`', () => {
    const state = Object.freeze({
      isFeching: true,
      characters: [],
      error: false,
      errorMessage: '',
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
      isFeching: false,
      characters: charactersData,
      error: false,
      errorMessage: '',
    };

    expect(characters(state, singleAnimeCreator.receiveCharacters(charactersData)))
      .toEqual(expected);
  });
});
