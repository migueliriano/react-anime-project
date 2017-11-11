import React from 'react';
import PropTypes from 'prop-types';

import {
  MainInfoContainer,
  PosterContainer,
  PosterImage,
  AnimeDetails,
  Row,
  TitleDetail,
  Detail,
} from 'style/animeMainInfo';

const AnimeMainInfo = props => (
  <MainInfoContainer>
    <PosterContainer>
      <PosterImage src={props.posterImage} alt="Poster Image Anime" />
    </PosterContainer>
    <AnimeDetails>
      {Object.keys(props.animeDetails).map(titleDetail => (
        <Row key={`${titleDetail}`}>
          <TitleDetail>{titleDetail}: </TitleDetail>
          <Detail>{props.animeDetails[titleDetail]}</Detail>
        </Row>
      ))}
    </AnimeDetails>
  </MainInfoContainer>
);

AnimeMainInfo.propTypes = {
  posterImage: PropTypes.string.isRequired,
  animeDetails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default AnimeMainInfo;
