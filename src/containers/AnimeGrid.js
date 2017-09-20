import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import AnimeReact from 'api/AnimeReact';
import AnimeGridList from 'components/AnimeGridList';

const LoadMoreContainer = styled.div`
  text-align: center;
`;

const CircularProgressStyle = styled(CircularProgress)`
  text-align: center;
`;

class AnimeGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
      nextPageUrl: '',
      loading: true,
    };
  }

  componentDidMount() {
    AnimeReact.fetchAnimeList()
      .then(animes => this.setAnimeDataStates(animes));
  }

  setAnimeDataStates = (animes) => {
    this.setState({ loading: true });

    if (animes) {
      this.setState(prevState => (
        {
          animes: [...prevState.animes, ...animes.data],
          nextPageUrl: animes.links.next,
          loading: false,
        }
      ));
    }
  }

  handleLoadMore = () => {
    const { nextPageUrl } = this.state;

    AnimeReact.fetchAnimeNextPage(nextPageUrl)
      .then(animes => this.setAnimeDataStates(animes));
  }

  render() {
    const { animes, loading } = this.state;
    console.log(animes);
    return (
      <div>
        <div className="filter-nav">Filter Nav</div>
        <AnimeGridList animes={animes} />
        <LoadMoreContainer>
          {loading && <CircularProgressStyle />}
          {!loading && <RaisedButton onClick={this.handleLoadMore} label="Load More Animes" primary />}
        </LoadMoreContainer>
      </div>
    );
  }
}

export default AnimeGrid;
