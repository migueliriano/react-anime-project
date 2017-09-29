import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = Styled.div`
  width: 60vw;
  margin-bottom: 30px;
`;

const Header = Styled.div`
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const BodyContainer = Styled.div`
  padding: 10px;
  background-color: #f3f3f3;
  border: 1px solid #d0cdcd;
  line-height: 30px;
  border-radius: 2px;
`;

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
