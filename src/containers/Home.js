import { connect } from 'react-redux';
import { fetchAnimesList, fetchNextPageAnimeList } from 'actions/animeList';

import Home from 'components/pages/Home';

const mapStateToProps = state => ({
  ...state.animeList,
});

const mapDispatchToProps = dispatch => (
  {
    actions: {
      fetchAnimesList: () => dispatch(fetchAnimesList()),
      fetchNextPageAnimeList: () => dispatch(fetchNextPageAnimeList()),
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
