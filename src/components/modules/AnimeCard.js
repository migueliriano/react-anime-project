import React from 'react';
import PropTypes from 'prop-types';

import {
  CardContainer,
  Header,
  BodyContainer,
} from 'style/animeCard';

const AnimeCard = props => (
  <CardContainer>
    <Header> {props.title} </Header>
    <BodyContainer> {props.children} </BodyContainer>
  </CardContainer>
);

AnimeCard.defaultProps = {
  title: '',
  children: '',
};

AnimeCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default AnimeCard;
