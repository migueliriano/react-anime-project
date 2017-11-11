import React from 'react';
import PropTypes from 'prop-types';

const YoutubeVideo = (props) => {
  const youtubeUrl = `https://www.youtube.com/embed/${props.videoId}`;

  return <iframe title="Anime Trailer Video" width="100%" height="400" src={youtubeUrl} frameBorder="0" allowFullScreen />;
};

YoutubeVideo.propTypes = {
  videoId: PropTypes.string,
};

YoutubeVideo.defaultProps = {
  videoId: 'RqJVa0fl01w',
};

export default YoutubeVideo;
