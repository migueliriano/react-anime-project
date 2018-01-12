/**
 * Example Response of Fetch Anime List
 *
 * @export const
 * @type {object}
 *
 */
export const animeListFetchResponse = {
  data: [
    {
      id: '1',
      type: 'anime',
    },
    {
      id: '2',
      type: 'ova',
    },
  ],
  links: {
    first: 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=15&page%5Boffset%5D=0',
    last: 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=15&page%5Boffset%5D=12515',
    next: 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=15&page%5Boffset%5D=15',
  },
};

/**
 * Example Response of Fetch Single Anime
 *
 * @export const
 * @type {object}
 *
 */
export const singleAnimeFetchResponse = {
  id: '1',
  type: 'anime',
};

/**
 * Example Response of Fetch Single Anime with Characters
 *
 * @export const
 * @type {object}
 *
 */
export const singleAnimeWithChacractersFetchResponse = {
  data: {
    id: '1',
    type: 'anime',
    relationships: {
      animeCharacters: {
        links: {
          self: 'https://kitsu.io/api/edge/anime/3/relationships/anime-characters',
          related: 'https://kitsu.io/api/edge/anime/3/anime-characters',
        },

        data: [
          {
            type: 'animeCharacters',
            id: '17762',
          },
          {
            type: 'animeCharacters',
            id: '17763',
          },
          {
            type: 'animeCharacters',
            id: '17764',
          },
          {
            type: 'animeCharacters',
            id: '17765',
          },
          {
            type: 'animeCharacters',
            id: '17766',
          },
          {
            type: 'animeCharacters',
            id: '17767',
          },
        ],
      },
    },
  },
};

export const fetchCharacters = jest.fn();
