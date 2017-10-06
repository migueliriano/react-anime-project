import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

const MainInfoContainer = Styled.div`
  border: solid 1px #edeeee;
  max-width: 300px;
  display: inline-block;
`;

const PosterContainer = Styled.div`
  padding: 15px;
`;

const PosterImage = Styled.img`
  max-width: 220px;
`;
const AnimeDetails = Styled.div`
  background-color: #f5f8f9;
`;
const Row = Styled.div`
  padding: 10px 15PX;
  border-bottom: 1px solid #eee;
`;

const TitleDetail = Styled.div`
  width: 40%;
  display: inline-block;
  color: #0591da;
  text-transform: capitalize;
  font-weight: bold;
`;

const Detail = Styled.span``;

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
