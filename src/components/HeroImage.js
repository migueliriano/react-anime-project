import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullWidthImage = styled.section`
  height: ${props => (props.backgroundImage ? '25vw' : 'initial')} ;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display:flex;
  margin-bottom: 30px;
  background-image:  url(${props => props.backgroundImage});
`;

const AnimeTitle = styled.div`
  background-color: rgba(0, 0, 0, .6);
  padding-left: 15px;
  color: #fff;
  align-self: flex-end;
  width: 100%;
  padding: 15px 30px;
  font-size: 30px;
  font-weight: bold;
`;

class HeroImage extends React.Component {
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleParallaxScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleParallaxScroll);
  };

  handleParallaxScroll = () => {
    document.querySelector('#hero-img').style.backgroundPositionY = `${window.scrollY}px`;
  };

  render = () => (
    <FullWidthImage id="hero-img" backgroundImage={this.props.src}>
      <AnimeTitle> {this.props.title}</AnimeTitle>
    </FullWidthImage>
  )
}

HeroImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeroImage;
