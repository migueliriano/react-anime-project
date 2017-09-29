const BASE_URL = 'https://kitsu.io/api/edge/';

const AnimeReact = {

  fetchAnimeList: () => (
    fetch(`${BASE_URL}anime`)
      .then(response => response.json())
      .catch(error => this.a.errorLog(error))
  ),

  fetchAnimeById: id => (
    fetch(`${BASE_URL}anime/${id}`)
      .then(response => response.json())
      .catch(error => this.a.errorLog(error))
  ),

  errorLog: (error) => {
    console.error(error);
    return null;
  },

  fetchAnimeNextPage: nextPageUrl => (
    fetch(nextPageUrl)
      .then(response => response.json())
      .catch(error => this.a.errorLog(error))
  ),
};

export default AnimeReact;
