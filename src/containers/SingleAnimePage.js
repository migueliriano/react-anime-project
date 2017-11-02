import { connect } from 'react-redux';
import { fetchSingleAnime } from 'actions/singleAnime';

import SinglePage from 'components/pages/SingleAnimePage';

const mapStateToProps = state => (
  {
    animeData: { ...state.singleAnime },
    charactersData: { ...state.animeCharacters },
  }
);

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchSingleAnime: id => dispatch(fetchSingleAnime(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
