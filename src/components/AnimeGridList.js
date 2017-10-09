import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import AnimeBoxLink from 'components/AnimeBoxLink';

const GridContainer = Styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 30px;
`;

class AnimeGridList extends React.PureComponent {
  static propTypes = {
    animes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  renderAnimeBoxLink = animes => animes.map(anime => <AnimeBoxLink anime={anime} />)

  render = () => (
    <GridContainer>
      {this.renderAnimeBoxLink(this.props.animes)}
    </GridContainer>
  )
}

AnimeGridList.propTypes = {
  animes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AnimeGridList;
