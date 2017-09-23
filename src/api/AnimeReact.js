const BASE_URL = 'https://kitsu.io/api/edge/';

const AnimeReact = {

  fetchAnimeList: () => (
    fetch(`${BASE_URL}anime`)
      .then(response => response.json())
      .catch(error => this.errorLog(error))
  ),

  errorLog: (error) => {
    console.log(error);
    return null;
  },

  fetchAnimeNextPage: nextPageUrl => (
    fetch(nextPageUrl)
      .then(response => response.json())
      .catch(error => this.errorLog(error))
  ),
};

export default AnimeReact;
