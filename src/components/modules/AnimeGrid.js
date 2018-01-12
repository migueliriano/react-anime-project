import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';

import {
  LoadMoreContainer,
  CircularProgressStyle,
  GridContainer,
} from 'style/animeGrid';
import AnimeGridList from './AnimeGridList';

class AnimeGrid extends React.PureComponent {
  static defaultProps = {
    infiniteScroll: true,
    currentViewLimitItem: 20,
  }

  static propTypes = {
    infiniteScroll: PropTypes.bool,
    animes: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFeching: PropTypes.bool.isRequired,
    fetchAnimesListIfIsNeeded: PropTypes.func.isRequired,
    fetchNextPageAnimeList: PropTypes.func.isRequired,
    currentViewLimitItem: PropTypes.number,
  }

  state = {
    dataSource: [],
  }

  componentDidMount = () => {
    const { fetchAnimesListIfIsNeeded, fetchNextPageAnimeList } = this.props;
    fetchAnimesListIfIsNeeded().then(() => {
      fetchNextPageAnimeList();
    });

    if (this.props.infiniteScroll) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    }
  }

  componentWillReceiveProps = ({ animes }) => {
    if (this.props.animes.length !== animes.length) {
      this.setNewDataSource(animes);
    }
  }

  componentWillUnmount = () => {
    if (this.props.infiniteScroll) {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }
  };
  /**
   * Set the current virtual view state to the `datasource` and property `virtualViewData`
   *
   * @param {array<object>} prevViewPortData - Preview data that the user going to see
   * @param {array<object>} currentViewPortData - Current data that the user is seeing
   * @param {array<object>} nextViewPortData - New data that the going to see
   *
   * @return {undefined}
   */
  setVirtualViewState = (
    prevViewPortData = [],
    currentViewPortData = [],
    nextViewPortData = [],
  ) => {
    this.virtualViewData = {
      prevViewPortData,
      currentViewPortData,
      nextViewPortData,
    };

    this.setState({
      dataSource: [
        ...prevViewPortData,
        ...currentViewPortData,
        ...nextViewPortData,
      ],
    });
  }

  /**
   * Slide the data using the `currentViewLimitItem` from the props and set the new data
   * for virtualViewData property
   *
   * @param {array<object>} animes - Array data that will be sliced.
   *
   * @return {undefined}
   */
  setNewDataSource = (animes) => {
    let { currentViewPortData, nextViewPortData, prevViewPortData } = this.virtualViewData;
    const { currentViewLimitItem } = this.props;

    if (animes.length <= currentViewLimitItem) {
      currentViewPortData = animes;
    }

    if (animes.length > currentViewLimitItem) {
      if (animes.length >= (currentViewLimitItem * 3)) {
        if (!currentViewPortData.length) {
          const dataLength = animes.length;
          const nextViewStartIndex = dataLength - currentViewLimitItem;
          const currentViewStartIndex = nextViewStartIndex - currentViewLimitItem;
          const previewViewStartIndex = currentViewStartIndex - currentViewLimitItem;

          nextViewPortData = animes.slice(nextViewStartIndex);
          currentViewPortData = animes.slice(currentViewStartIndex, nextViewStartIndex);
          prevViewPortData = animes.slice(previewViewStartIndex, currentViewStartIndex);
        } else {
          prevViewPortData = currentViewPortData;
          currentViewPortData = nextViewPortData;

          const lastIndexNextViewPortData = nextViewPortData[nextViewPortData.length - 1];

          const startIndex = animes.findIndex(element => (
            element.id === lastIndexNextViewPortData.id
          ));
          nextViewPortData = animes.slice(startIndex + 1);
        }
      } else {
        const lastIndexCurrentViewData = currentViewPortData[currentViewPortData.length - 1];

        const startIndex = animes.findIndex(element => element.id === lastIndexCurrentViewData.id);
        nextViewPortData = animes.slice(startIndex + 1);
      }
    }

    this.setVirtualViewState(prevViewPortData, currentViewPortData, nextViewPortData);
  }

  /**
   * Function to set state the `dataSource` with the prev page list.
   *
   * @return {undefined}
   */
  setPrevPageDataSource = () => {
    let { prevViewPortData, currentViewPortData, nextViewPortData } = this.virtualViewData;
    const { animes } = this.props;
    if (!prevViewPortData.length) {
      return;
    }

    const firstPrevViewItem = prevViewPortData[0];
    const firstPrevViewIElement = document.getElementById(`link-box-${firstPrevViewItem.id}`);
    const isPrevViewElementScroll =
      window.scrollY <= (firstPrevViewIElement.offsetTop + firstPrevViewIElement.offsetHeight);

    if (isPrevViewElementScroll) {
      nextViewPortData = currentViewPortData;
      currentViewPortData = prevViewPortData;

      const lastIndex = animes.findIndex(element => element.id === firstPrevViewItem.id);
      let startIndex = lastIndex - prevViewPortData.length;
      startIndex = startIndex > 0 ? startIndex : 0;

      prevViewPortData = animes.slice(startIndex, lastIndex);

      this.setVirtualViewState(prevViewPortData, currentViewPortData, nextViewPortData);
    }
  }

  virtualViewData = {
    currentViewPortData: [],
    nextViewPortData: [],
    prevViewPortData: [],
  }

  /**
   * Function to trigger the `fetchNextPageAnimeList` if is in the end of the paged
   *
   * @return {undefined}
   */
  fetchOrSetNextPageAnime = () => {
    let {
      nextViewPortData,
      currentViewPortData,
      prevViewPortData,
    } = this.virtualViewData;

    const { isFeching } = this.props;
    const scrollPointView = nextViewPortData.length ? nextViewPortData : currentViewPortData;

    if (isFeching || !scrollPointView.length) {
      return;
    }

    const { animes } = this.props;

    const lastNextViewItem = scrollPointView[scrollPointView.length - 1];
    const firstNextViewItem = scrollPointView[0];
    const firstNextViewElement = document.getElementById(`link-box-${firstNextViewItem.id}`);

    const widowScrollbottom = window.scrollY + window.outerHeight;

    const isScrollPastNextviewElement = (firstNextViewElement.offsetTop <= widowScrollbottom);

    const isLastDataSource = animes[animes.length - 1].id === lastNextViewItem.id;

    if (isLastDataSource && isScrollPastNextviewElement) {
      this.props.fetchNextPageAnimeList();
    } else if (!isLastDataSource && isScrollPastNextviewElement) {
      prevViewPortData = currentViewPortData;
      currentViewPortData = nextViewPortData;

      const startIndex = animes.findIndex(element => element.id === lastNextViewItem.id) + 1;
      const lastIndex = startIndex + currentViewPortData.length;

      nextViewPortData = animes.slice(startIndex, lastIndex);

      this.setVirtualViewState(prevViewPortData, currentViewPortData, nextViewPortData);
    }
  }

  /**
   * Function to handle all the scroll events that will be trigger
   *
   * @return {undefined}
   */
  handleScroll = () => {
    this.fetchOrSetNextPageAnime();
    this.setPrevPageDataSource();
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
