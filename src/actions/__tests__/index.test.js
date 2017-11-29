import actions from '../index';

import * as animeList from '../animeList';
import * as animeListCreators from '../animeListCreators';
import * as singleAnime from '../singleAnime';
import * as singleAnimeCreators from '../singleAnimeCreators';

it('Get actions index', () => {
  const expected = {
    ...animeList,
    ...singleAnime,
    ...singleAnimeCreators,
    ...animeListCreators,
  };
  expect(actions).toMatchObject(expected);
});
