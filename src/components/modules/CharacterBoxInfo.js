import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import ImageNotFound from 'img/poster-not-found.jpg';

import {
  CharacterBox,
  CharacterName,
  CharacterImage,
} from 'style/characterBoxInfo';

const CharacterBoxInfo = props => (
  <CharacterBox key={props.id}>
    <CharacterImage
      src={
        !_.isNull(props.attributes.image) ?
          props.attributes.image.original :
          ImageNotFound}
      alt={props.name}
    />
    <CharacterName>{ props.attributes.name }</CharacterName>
  </CharacterBox>
);

CharacterBoxInfo.propTypes = {
  attributes: PropTypes.shape(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CharacterBoxInfo;
