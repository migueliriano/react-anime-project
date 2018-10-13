import { connect } from 'react-redux';
import {
  fetchAnimesListIfIsNeeded,
  fetchNextPageAnimeList
} from 'actions/animeList';

import fetchSearchAnime  from 'actions/searchAnime';
import Home from 'components/pages/Home';

const mapStateToProps = state => ({
  animeList: {...state.animeList},
  searchAnime: {...state.searchAnime},
});

const mapDispatchToProps = dispatch => (
  {
    actions: {
      fetchAnimesListIfIsNeeded: () => dispatch(fetchAnimesListIfIsNeeded()),
      fetchNextPageAnimeList: () => dispatch(fetchNextPageAnimeList()),
      fetchSearchAnime: animeName => dispatch(fetchSearchAnime(animeName)),
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
