import { connect } from 'react-redux';
import { fetchAnimesListIfIsNeeded, fetchNextPageAnimeList } from 'actions/animeList';

import Home from 'components/pages/Home';

const mapStateToProps = state => ({
  ...state.animeList,
});

const mapDispatchToProps = dispatch => (
  {
    actions: {
      fetchAnimesListIfIsNeeded: () => dispatch(fetchAnimesListIfIsNeeded()),
      fetchNextPageAnimeList: () => dispatch(fetchNextPageAnimeList()),
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
