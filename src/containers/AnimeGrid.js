import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import AnimeReact from 'api/AnimeReact';
import AnimeGridList from 'components/AnimeGridList';

const LoadMoreContainer = styled.div`
  text-align: center;
`;

const CircularProgressStyle = styled(CircularProgress)`
  text-align: center;
`;

class AnimeGrid extends React.Component {
  static defaultProps = {
    infiniteScroll: false,
    loadBeforeScrollEnd: 5,
  }

  state = {
    animes: [],
    nextPageUrl: '',
    isLoading: true,
  }

  componentDidMount = () => {
    AnimeReact.fetchAnimeList()
      .then(animes => this.setAnimeDataStates(animes));
    if (this.props.infiniteScroll) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount = () => {
    if (this.props.infiniteScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };

  setAnimeDataStates = (animes) => {
    if (animes) {
      this.setState(prevState => (
        {
          animes: [...prevState.animes, ...animes.data],
          nextPageUrl: animes.links.next,
          isLoading: false,
        }
      ));
    }
  }

  handleScroll = () => {
    const currentWindowHeight =
      (window.innerHeight + window.scrollY) + this.props.loadBeforeScrollEnd;

    if (currentWindowHeight >= document.body.offsetHeight) {
      window.removeEventListener('scroll', this.handleScroll);
      this.handleLoadMore()
        .then(() => window.addEventListener('scroll', this.handleScroll));
    }
  }

  handleLoadMore = () => {
    const { nextPageUrl } = this.state;

    this.setState({ isLoading: true });

    return AnimeReact.fetchAnimeNextPage(nextPageUrl)
      .then(animes => this.setAnimeDataStates(animes));
  }

  render() {
    const { animes, isLoading } = this.state;
    const { infiniteScroll } = this.props;
    return (
      <div>
        {/* <div className="filter-nav">Filter Nav</div> */}
        <AnimeGridList animes={animes} />
        <LoadMoreContainer>
          {isLoading && <CircularProgressStyle />}
          {!isLoading && !infiniteScroll && <RaisedButton onClick={this.handleLoadMore} label="Load More Animes" primary />}
        </LoadMoreContainer>
      </div>
    );
  }
}

AnimeGrid.propTypes = {
  infiniteScroll: PropTypes.bool,
  loadBeforeScrollEnd: PropTypes.number,
};

export default AnimeGrid;
