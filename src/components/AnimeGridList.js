import React from 'react';
import PropTypes from 'prop-types';

import AnimeBoxLink from 'components/AnimeBoxLink';

import {
  GridContainer,
} from 'style/animeGridList';

class AnimeGridList extends React.PureComponent {
  static propTypes = {
    animes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  /**
   * @param {array<object>} animes - Anime list with all the data
   *
   * @return {<AnimeBoxLink>} Component to show the data in a box with the link.
   */
  renderAnimeBoxLink = animes => animes.map(anime => <AnimeBoxLink key={anime.id} anime={anime} />)

  render = () => (
    <GridContainer>
      {this.renderAnimeBoxLink(this.props.animes)}
    </GridContainer>
  )
}

export default AnimeGridList;
