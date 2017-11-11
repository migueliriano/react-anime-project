import React from 'react';
import PropTypes from 'prop-types';

import {
  FullWidthImage,
  AnimeTitle,
} from 'style/heroImage';

class HeroImage extends React.Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleParallaxScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleParallaxScroll);
  };

  /**
   * Move the brackground of the hero image by the scroll position
   */
  handleParallaxScroll = () => {
    document.querySelector('#hero-img').style.backgroundPositionY = `${window.scrollY}px`;
  };

  render = () => (
    <FullWidthImage id="hero-img" backgroundImage={this.props.src}>
      <AnimeTitle> { this.props.title } </AnimeTitle>
    </FullWidthImage>
  )
}

HeroImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeroImage;
