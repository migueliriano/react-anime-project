import React from 'react';
import PropTypes from 'prop-types';

import {
  LinkBoxAnime,
  BoxDetail,
  Title,
  Detail,
  Type,
  AverageRank,
} from 'style/animeBoxLink';

import imgNotFound from 'img/poster-not-found.jpg';

const AnimeBoxLink = (props) => {
  const {
    canonicalTitle,
    posterImage,
    showType,
    averageRating,
  } = props.anime.attributes;
  const { id } = props.anime;
  const largePosterImg = posterImage ? posterImage.large : imgNotFound;

  return (
    <LinkBoxAnime
      to={`/anime/${id}`}
      key={id}
      style={{ backgroundImage: `url(${largePosterImg}` }}
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
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnimeBoxLink;
