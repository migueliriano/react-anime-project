import actions from '../index';

import * as animeListCreators from '../animeListCreators';
import * as singleAnimeCreators from '../singleAnimeCreators';
import * as animeList from '../animeList';
import singleAnime from '../singleAnime';
import characters from '../characters';

it('Get actions index', () => {
  const expected = {
    ...animeList,
    ...singleAnimeCreators,
    ...animeListCreators,
    singleAnime,
    characters,
  };
  expect(actions).toMatchObject(expected);
});
