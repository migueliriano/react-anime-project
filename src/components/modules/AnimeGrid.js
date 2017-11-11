import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import _ from 'underscore';

import {
  LoadMoreContainer,
  CircularProgressStyle,
  GridContainer,
} from 'style/animeGrid';
import AnimeGridList from './AnimeGridList';

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
    this.handleScroll = _.debounce(this.handleScroll, 20);
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
      const newDataSource = this.getInitialDataSource(animes);
      this.setState({ dataSource: newDataSource });
    }
  }

  componentWillUnmount = () => {
    if (this.props.infiniteScroll) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
  };

  /**
   * Slide the data using the `dataSourceLimit` from the props.
   *
   * @param {array} animes - Array data that will be sliced.
   * @return {array} Data sliced with if `animes` is mayor of dataSourceLimit`
   * the otherwise return the variable was passed.
   */
  getInitialDataSource = (animes) => {
    const { dataSourceLimit } = this.props;
    if (animes.length > dataSourceLimit) {
      const lastIndex = animes.length;
      const startIndex = animes.length - dataSourceLimit;

      return animes.slice(startIndex, lastIndex);
    }
    return animes;
  }

  /**
   * Function to set state the `dataSource` with the prev page list.
   *
   * @return {undefined}
   */
  setPrevPageDataSource = () => {
    const isScrollDirectionTop = window.scrollY < this.lastScrollTop;
    const currentScrollPosition = window.scrollY - this.props.loadBeforeScrollEnd;

    if (isScrollDirectionTop && currentScrollPosition <= 0) {
      const firstDataSource = this.state.dataSource[0];
      const { animes } = this.props;

      if (firstDataSource.id === animes[0].id) {
        return;
      }

      const dataSourceLimit = this.getDataSourceLimits(firstDataSource, animes);
      const { lastIndex } = dataSourceLimit;

      let { startIndex } = dataSourceLimit;

      startIndex = startIndex < 0 ? 0 : startIndex;

      const newDataSource = animes.slice(startIndex, lastIndex);

      this.setState({ dataSource: newDataSource });
    }

    this.lastScrollTop = window.scrollY;
  }

  /**
   * Function to set state the `dataSource` with the next page list.
   *
   * @return {undefined}
   */
  setNextPageDataSource = () => {
    const { dataSource } = this.state;
    const { animes } = this.props;

    const isNotLastDatasource =
      animes[animes.length - 1].id !== dataSource[dataSource.length - 1].id;

    const currentWindowHeight =
      (window.innerHeight + window.scrollY) + this.props.loadBeforeScrollEnd;

    if (currentWindowHeight >= document.body.offsetHeight && isNotLastDatasource) {
      const lastDataSourceItem = this.state.dataSource[this.state.dataSource.length - 1];

      const { startIndex, lastIndex } = this.getDataSourceLimits(lastDataSourceItem, animes);

      const newDataSource = animes.slice(startIndex, lastIndex);

      this.setState({ dataSource: newDataSource });
    }
  }
  /**
   * Split the `sourceData` in a half filter by a `itemData`
   *
   * @param {object} itemData - An item object to get the index of the data source
   * @param {array<object>} sourceData - Data will be filter to get the index
   *
   * @return {object} with the `startIndex` and `lastIndex`.
   */
  getDataSourceLimits = (itemData, sourceData) => {
    const elementIndex =
      sourceData.findIndex(element => element.id === itemData.id);
    const dataSourceLimitMiddle = (this.props.dataSourceLimit / 2);

    return {
      startIndex: elementIndex - dataSourceLimitMiddle,
      lastIndex: elementIndex + dataSourceLimitMiddle,
    };
  }

  /**
   * Function to trigger the `fetchNextPageAnimeList` if is in the end of the paged
   *
   * @return {undefined}
   */
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

  /**
   * Function to handle all the scroll events that will be trigger
   *
   * @return {undefined}
   */
  handleScroll = () => {
    this.fetchNextPageAnime();
    this.setPrevPageDataSource();
    this.setNextPageDataSource();
  }

  /**
   * Function that goig to trigger the `fetchNextPageAnimeList`
   *
   * @return {undefined}
   */
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
