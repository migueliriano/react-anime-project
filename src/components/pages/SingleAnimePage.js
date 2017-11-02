import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'underscore';

import HeroImage from 'components/HeroImage';
import AnimeMainInfo from 'components/AnimeMainInfo';
import AnimeCard from 'components/AnimeCard';
import YoutubeVideo from 'components/YoutubeVideo';
import Logo from 'components/Logo';


import ImageNotFound from 'img/poster-not-found.jpg';

const SinglePageContainer = styled.div``;

const CircularProgressStyle = styled(CircularProgress)`
  margin: 0 auto;
`;
const CharacterBox = styled.div`
  text-align: center;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const CharacterBodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LogoLinkContainer = styled.div`
  text-align: center;
  display: block;
`;

const ColumnAnimeinfo = styled.div`
  margin-left: 15px;
  display: inline-block;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const ColumnBodyPage = ColumnAnimeinfo.extend`
  margin-left: 50px;
  vertical-align: top;
`;

const CharacterBoxInfo = props => (
  <CharacterBox key={props.id}>
    <img
      style={{ maxWidth: 100, height: 200 }}
      src={
        !_.isNull(props.attributes.image) ?
          props.attributes.image.original :
          ImageNotFound}
      alt={props.name}
    />
    <h1 style={{
      fontWeight: 'bold',
      maxWidth: 100,
      lineHeight: '20px',
    }}
    >{ props.attributes.name }</h1>
  </CharacterBox>
);

CharacterBoxInfo.propTypes = {
  attributes: PropTypes.shape(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

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
      { props.charactersData.isFeching && <CircularProgress /> }
    </AnimeCard>

    <AnimeCard title="Video">
      <YoutubeVideo videoId={props.youtubeVideoId} />
    </AnimeCard>
  </ColumnBodyPage>
);

BodyDetailPage.propTypes = {
  synopsis: PropTypes.string.isRequired,
  youtubeVideoId: PropTypes.string.isRequired,
  charactersData: PropTypes.objectOf(PropTypes.any).isRequired,
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
