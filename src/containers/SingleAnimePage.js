import { connect } from 'react-redux';
import { fetchSingleAnime } from 'actions/singleAnime';

import SinglePage from 'components/pages/SingleAnimePage';

const mapStateToProps = state => ({
  ...state.singleAnime,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchSingleAnime: id => dispatch(fetchSingleAnime(id)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePage);
