const BASE_URL = 'https://kitsu.io/api/edge/';

const AnimeReact = {

  fetchAnimeList() {
    return fetch(`${BASE_URL}anime?page[limit]=15`)
      .then(response => response.json())
      .catch(error => this.errorLog(error));
  },

  fetchAnimeById(id) {
    return fetch(`${BASE_URL}anime/${id}?include=animeCharacters`)
      .then(response => response.json())
      .catch(error => this.errorLog(error));
  },

  fetchAnimeNextPage(nextPageUrl) {
    return fetch(nextPageUrl)
      .then(response => response.json())
      .catch(error => this.a.errorLog(error));
  },

  errorLog: (error) => {
    console.error(error);
    return null;
  },

};

export default AnimeReact;
