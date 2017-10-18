import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import imgNotFound from 'img/poster-not-found.jpg';

const LinkBoxAnime = Styled.a`
  display: inline-block;
  position: relative;
  margin-right: 30px;
  margin-bottom: 30px;
  text-align: center;
  padding: 15px;
  width: 13vw;
  height: 20vw;
  background-size: cover;
  color: #fff;
  border-radius: 5px;
  background-image: url(${props => props.backgroundImage});
`;

const BoxDetail = Styled.div`
  background: #000;
  height: 5vw;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(bottom,rgba(0,0,0,1), rgba(0,0,0,.4));
  background: -webkit-linear-gradient(bottom,rgba(0,0,0,1),rgba(0,0,0,.4));
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  padding-top: 15px;
`;

const Title = Styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Detail = Styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
const Type = Styled.span`
  color: #53c4ff;
  font-weight: bold;
  text-transform: uppercase;
`;

const AverageRank = Type.extend`
  margin-left: 15px;
`;

const AnimeBoxLink = (props) => {
  const { canonicalTitle, posterImage, showType, averageRating } = props.anime.attributes;
  const { id } = props.anime;
  const largePosterImg = posterImage ? posterImage.large : imgNotFound;

  return (
    <LinkBoxAnime
      href={`/anime/${id}`}
      target="_blank"
      key={id}
      backgroundImage={largePosterImg}
    >

      <BoxDetail>
        <Title>{canonicalTitle}</Title>
        <Detail>
          <Type>{showType}</Type>
          <AverageRank>{averageRating || '0'}%</AverageRank>
        </Detail>
      </BoxDetail>
    </LinkBoxAnime>
  );
};

AnimeBoxLink.propTypes = {
  anime: PropTypes.shape({
    attributes: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AnimeBoxLink;
