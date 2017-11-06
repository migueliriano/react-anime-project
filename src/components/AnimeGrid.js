import React from 'react';

import Styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import AnimeGridList from './AnimeGridList';

const LoadMoreContainer = Styled.div`
  text-align: center;
`;

const CircularProgressStyle = Styled(CircularProgress)`
  text-align: center;
`;

const GridContainer = Styled.div``;

class AnimeGrid extends React.PureComponent {
  static defaultProps = {
    infiniteScroll: true,
    loadBeforeScrollEnd: 500,
  }

  static propTypes = {
    infiniteScroll: PropTypes.bool,
    loadBeforeScrollEnd: PropTypes.number,
    animes: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFeching: PropTypes.bool.isRequired,
    fetchAnimesListIfIsNeeded: PropTypes.func.isRequired,
    fetchNextPageAnimeList: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { isFeching, fetchAnimesListIfIsNeeded } = this.props;
    if (!isFeching) {
      fetchAnimesListIfIsNeeded();
    }

    if (this.props.infiniteScroll) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    }
  }

  componentWillUnmount = () => {
    if (this.props.infiniteScroll) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
  };

  /** Fech the next page if is in the end of the limit of the scrool setup in the option */
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

  /** Fech the next page if this function is trigger */
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
