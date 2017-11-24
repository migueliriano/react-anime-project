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
