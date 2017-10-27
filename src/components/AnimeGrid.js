import React from 'react';

import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import AnimeGridList from './AnimeGridList';

const LoadMoreContainer = styled.div`
  text-align: center;
`;

const CircularProgressStyle = styled(CircularProgress)`
  text-align: center;
`;

const GridContainer = styled.div``;

class AnimeGrid extends React.Component {
  static defaultProps = {
    infiniteScroll: true,
    loadBeforeScrollEnd: 500,
  }

  static propTypes = {
    infiniteScroll: PropTypes.bool,
    loadBeforeScrollEnd: PropTypes.number,
    animes: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFeching: PropTypes.bool.isRequired,
    fetchAnimesList: PropTypes.func.isRequired,
    fetchNextPageAnimeList: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { isFeching, fetchAnimesList } = this.props;
    if (!isFeching) {
      fetchAnimesList();
    }

    if (this.props.infiniteScroll) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    }
  }

  componentWillUnmount = () => {
    if (this.props.infiniteScroll) {
      window.removeEventListener('scroll resize', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
  };

  handleScroll = () => {
    if (this.props.isFeching) {
      return;
    }

    const currentWindowHeight =
      (window.innerHeight + window.scrollY) + this.props.loadBeforeScrollEnd;

    if (currentWindowHeight >= document.body.offsetHeight) {
      this.props.fetchNextPageAnimeList();
    }
  }

  handleLoadMore = () => this.props.fetchNextPageAnimeList();


  render = () => {
    const { infiniteScroll, animes, isFeching } = this.props;
    return (
      <GridContainer>
        <AnimeGridList animes={animes} />
        <LoadMoreContainer>
          {isFeching && <CircularProgressStyle />}
          {!isFeching && !infiniteScroll && <RaisedButton onClick={this.handleLoadMore} label="Load More Animes" primary />}
        </LoadMoreContainer>
      </GridContainer>
    );
  }
}

export default AnimeGrid;
