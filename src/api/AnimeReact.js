const BASE_URL = 'https://kitsu.io/api/edge/';

/**
 * Anime Api Object to get the data from kitsu
 */
const AnimeReact = {

  /**
   * Return a list of 15 Animes
   *
   * @return {promise}
   */
  fetchAnimeList() {
    return fetch(`${BASE_URL}anime?page[limit]=15`)
      .then(response => response.json())
      .catch(error => this.errorLog(error));
  },

  /**
   * Get the Anime ID and return the data.
   *
   * @param {int} id - Anime Id
   * @return {promise} The Anime Data
   */
  fetchAnimeById(id) {
    return fetch(`${BASE_URL}anime/${id}?include=animeCharacters`)
      .then(response => response.json())
      .catch(error => this.errorLog(error));
  },

  /**
   * Get the next url of pagination and return a collection of animes
   *
   * @param {string} nextPageUrl - Next page url from API
   * @return {promise} - Return a collection of Anime
   */
  fetchAnimeNextPage(nextPageUrl) {
    return fetch(nextPageUrl)
      .then(response => response.json())
      .catch(error => this.a.errorLog(error));
  },

  /**
   * Print a console log with the API error
   *
   * @param {string}
   * @return {null}
   */
  errorLog: (error) => {
    console.error(error);
    return null;
  },

};

export default AnimeReact;
