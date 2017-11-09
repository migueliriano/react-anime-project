import React from 'react';

import Styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import _ from 'underscore';
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
    dataSourceLimit: 45,
  }

  static propTypes = {
    infiniteScroll: PropTypes.bool,
    loadBeforeScrollEnd: PropTypes.number,
    animes: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFeching: PropTypes.bool.isRequired,
    fetchAnimesListIfIsNeeded: PropTypes.func.isRequired,
    fetchNextPageAnimeList: PropTypes.func.isRequired,
    dataSourceLimit: PropTypes.number,
  }

  constructor() {
    super();
    this.handleScroll = _.debounce(this.handleScroll, 50);
  }

  state = {
    dataSource: [],
  }

  componentDidMount = () => {
    const { isFeching, fetchAnimesListIfIsNeeded, animes } = this.props;

    if (!isFeching) {
      fetchAnimesListIfIsNeeded();
    }

    if (this.props.infiniteScroll) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    }

    const newDataSource = this.getInitialDataSource(animes);
    this.setState({ dataSource: newDataSource });
  }

  componentWillReceiveProps = ({ animes }) => {
    if (this.props.animes.length !== animes.length) {
      const newAnimeData = this.getInitialDataSource(animes);
      this.setState({ dataSource: newAnimeData });
    }
  }

  componentWillUnmount = () => {
    if (this.props.infiniteScroll) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
  };

  getInitialDataSource = (animes) => {
    const { dataSourceLimit } = this.props;
    if (animes.length > dataSourceLimit) {
      const lastIndex = animes.length;
      const startIndex = animes.length - dataSourceLimit;

      return animes.slice(startIndex, lastIndex);
    }
    return animes;
  }

  setPrevPageDataSource = () => {
    const isScrollDirectionTop = window.scrollY < this.lastScrollTop;
    const currentScrollPosition = window.scrollY - this.props.loadBeforeScrollEnd;
    if (isScrollDirectionTop && currentScrollPosition <= 0) {
      const firstDataSource = this.state.dataSource[0];
      const { animes } = this.props;

      if (firstDataSource.id === animes[0].id) {
        return;
      }

      const firstElementIndex =
        animes.findIndex(element => element.id === firstDataSource.id);

      const dataSourceLimitMiddle = (this.props.dataSourceLimit / 2);
      const lastIndex = firstElementIndex + dataSourceLimitMiddle;
      let startIndex = firstElementIndex - dataSourceLimitMiddle;

      startIndex = startIndex < 0 ? 0 : startIndex;

      const newDataSource = animes.slice(startIndex, lastIndex);

      this.setState({ dataSource: newDataSource });
    }

    this.lastScrollTop = window.scrollY;
  }

  setNextPageDataSource = () => {
    const { dataSource } = this.state;
    const { animes } = this.props;
    const isNotLastDatasource =
      animes[animes.length - 1].id !== dataSource[dataSource.length - 1].id;
    const currentWindowHeight =
      (window.innerHeight + window.scrollY) + this.props.loadBeforeScrollEnd;

    if (currentWindowHeight >= document.body.offsetHeight && isNotLastDatasource) {
      const lastDataSourceItem = this.state.dataSource[this.state.dataSource.length - 1];

      const lastElementIndex =
        animes.findIndex(element => element.id === lastDataSourceItem.id);

      const dataSourceLimitMiddle = (this.props.dataSourceLimit / 2);
      const lastIndex = lastElementIndex + dataSourceLimitMiddle;
      const startIndex = lastElementIndex - dataSourceLimitMiddle;

      const newDataSource = animes.slice(startIndex, lastIndex);

      this.setState({ dataSource: newDataSource });
    }
  }

  fetchNextPageAnime = () => {
    if (this.props.isFeching) {
      return;
    }

    const { dataSource } = this.state;
    const { animes } = this.props;
    const isLastDataSource = animes[animes.length - 1].id === dataSource[dataSource.length - 1].id;
    const currentWindowHeight =
      (window.innerHeight + window.scrollY) + this.props.loadBeforeScrollEnd;

    if (currentWindowHeight >= document.body.offsetHeight && isLastDataSource) {
      this.props.fetchNextPageAnimeList();
    }
  }

  lastScrollTop = 0;

  /** Fech the next page if is in the end of the limit of the scrool setup in the option */
  handleScroll = () => {
    this.fetchNextPageAnime();
    this.setPrevPageDataSource();
    this.setNextPageDataSource();
  }

  /** Fech the next page if this function is trigger */
  handleLoadMore = () => this.props.fetchNextPageAnimeList();

  render = () => {
    const { infiniteScroll, isFeching } = this.props;
    return (
      <GridContainer>
        <AnimeGridList animes={this.state.dataSource} />
        <LoadMoreContainer>
          {isFeching && <CircularProgressStyle />}
          {!isFeching && !infiniteScroll && <RaisedButton onClick={this.handleLoadMore} label="Load More Animes" primary />}
        </LoadMoreContainer>
      </GridContainer>
    );
  }
}

export default AnimeGrid;
