import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import HeroImage from 'components/modules/HeroImage';
import AnimeMainInfo from 'components/modules/AnimeMainInfo';
import AnimeCard from 'components/modules/AnimeCard';
import YoutubeVideo from 'components/modules/YoutubeVideo';
import Logo from 'components/modules/Logo';
import CharacterBoxInfo from 'components/modules/CharacterBoxInfo';

import {
  SinglePageContainer,
  CircularProgressStyle,
  CharacterBodyContainer,
  LogoLinkContainer,
  ColumnAnimeinfo,
  ColumnBodyPage,

} from 'style/singleAnimePage';

import ImageNotFound from 'img/poster-not-found.jpg';

const CharacterSection = props => (
  <CharacterBodyContainer>
    {props.characters.length > 0 ?
      props.characters.map(character => CharacterBoxInfo(character.data)) :
      'Not Characters found.'
    }
  </CharacterBodyContainer>
);

CharacterSection.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const AnimeBoxInfo = props => (
  <ColumnAnimeinfo>
    <LogoLinkContainer>
      <Logo />
    </LogoLinkContainer>
    <AnimeMainInfo
      posterImage={props.posterImage}
      animeDetails={props.animeDetails}
    />
  </ColumnAnimeinfo>
);

AnimeBoxInfo.propTypes = {
  posterImage: PropTypes.string.isRequired,
  animeDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

const BodyDetailPage = props => (
  <ColumnBodyPage>
    <AnimeCard title="Description">
      {props.synopsis}
    </AnimeCard>

    <AnimeCard title="Characters">
      {
        !props.charactersData.isFeching &&
        <CharacterSection characters={props.charactersData.characters} /> }
      { props.charactersData.isFeching && <CircularProgressStyle /> }
    </AnimeCard>

    <AnimeCard title="Video">
      <YoutubeVideo videoId={props.youtubeVideoId} />
    </AnimeCard>
  </ColumnBodyPage>
);

BodyDetailPage.propTypes = {
  synopsis: PropTypes.string.isRequired,
  youtubeVideoId: PropTypes.string,
  charactersData: PropTypes.objectOf(PropTypes.any).isRequired,
};

BodyDetailPage.defaultProps = {
  youtubeVideoId: '',
};

class SingleAnimePage extends React.Component {
  static defaultProps = {
    animeData: {},
    charactersData: {},
    match: {},
  }
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any),
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    animeData: PropTypes.objectOf(PropTypes.any),
    charactersData: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  componentWillMount() {
    window.scrollTo(0, 0);
    const animeId = this.props.match.params.id;
    this.props.actions.fetchSingleAnime(animeId);
  }

  render = () => {
    if (!_.isEmpty(this.props.animeData.anime) && !this.props.animeData.isFeching) {
      const {
        coverImage,
        canonicalTitle,
        posterImage,
        showType,
        episodeCount,
        status,
        startDate,
        endDate,
        averageRating,
        episodeLength,
        synopsis,
        youtubeVideoId,
      } = this.props.animeData.anime.attributes;

      const animeDetails = {
        type: showType,
        episodes: episodeCount,
        status,
        start: startDate,
        end: endDate,
        rating: averageRating,
        duraction: `${episodeLength} mins`,
      };

      const characters = this.props.charactersData;
      const largePorterImg = posterImage ? posterImage.large : ImageNotFound;
      const largeConverIMage = coverImage ? coverImage.large : '';

      return (
        <SinglePageContainer>
          <HeroImage
            src={largeConverIMage}
            title={canonicalTitle}
          />
          <AnimeBoxInfo
            posterImage={largePorterImg}
            animeDetails={animeDetails}
          />
          <BodyDetailPage
            synopsis={synopsis}
            youtubeVideoId={youtubeVideoId}
            charactersData={characters}
          />
        </SinglePageContainer>
      );
    }
    return (
      <SinglePageContainer>
        <CircularProgressStyle />
      </SinglePageContainer>
    );
  }
}

export default SingleAnimePage;
