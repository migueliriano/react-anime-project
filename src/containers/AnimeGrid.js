import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import AnimeReact from 'api/AnimeReact';
import AnimeGridList from 'components/AnimeGridList';
import Logo from 'components/Logo';
import { Header } from 'style/base';

const LoadMoreContainer = styled.div`
  text-align: center;
`;

const CircularProgressStyle = styled(CircularProgress)`
  text-align: center;
`;

const HomePageContainer = styled.div``;

class AnimeGrid extends React.Component {
  static defaultProps = {
    infiniteScroll: false,
    loadBeforeScrollEnd: 20,
  }

  state = {
    animes: [],
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
      this.nextPageUrl = animes.links.next;
      this.setState(prevState => (
        {
          animes: [...prevState.animes, ...animes.data],
          isLoading: false,
        }
      ));
    }
  }

  handleScrollRunning = false;
  nextPageUrl = '';

  handleScroll = () => {
    if (this.handleScrollRunning) {
      return;
    }

    const currentWindowHeight =
      (window.innerHeight + window.scrollY) + this.props.loadBeforeScrollEnd;

    if (currentWindowHeight >= document.body.offsetHeight) {
      this.handleScrollRunning = true;
      this.handleLoadMore()
        .then(() => { this.handleScrollRunning = false; });
    }
  }

  handleLoadMore = () => {
    this.setState({ isLoading: true });

    return AnimeReact.fetchAnimeNextPage(this.nextPageUrl)
      .then(animes => this.setAnimeDataStates(animes));
  }

  render = () => {
    const { animes, isLoading } = this.state;
    const { infiniteScroll } = this.props;
    return (
      <HomePageContainer>
        <Header>
          <Logo />
        </Header>
        {/* <div className="filter-nav">Filter Nav</div> */}
        <AnimeGridList animes={animes} />
        <LoadMoreContainer>
          {isLoading && <CircularProgressStyle />}
          {!isLoading && !infiniteScroll && <RaisedButton onClick={this.handleLoadMore} label="Load More Animes" primary />}
        </LoadMoreContainer>
      </HomePageContainer>
    );
  }
}

AnimeGrid.propTypes = {
  infiniteScroll: PropTypes.bool,
  loadBeforeScrollEnd: PropTypes.number,
};

export default AnimeGrid;
