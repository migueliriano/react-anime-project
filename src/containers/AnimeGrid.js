import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AnimeReact from 'api/AnimeReact';

const GridContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
`;

const LinkBoxAnime = styled.a`
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
`;

const BoxDetail = styled.div`
  background: #000;
  height: 5vw;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: -webkit-linear-gradient(bottom,rgba(0,0,0,1), rgba(0,0,0,.4));
  background: -o-linear-gradient(bottom,rgba(0,0,0,1), rgba(0,0,0,.4));
  background: -moz-linear-gradient(bottom,rgba(0,0,0,1), rgba(0,0,0,.4));
  background: linear-gradient(bottom,rgba(0,0,0,1), rgba(0,0,0,.4));
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  padding-top: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Detail = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
const AnimeType = styled.span`
  color: #53c4ff;
  font-weight: bold;
  text-transform: uppercase;
`;
const AnimeGridList = props =>
  (<GridContainer>
    {props.animes.map((anime) => {
      const { canonicalTitle, posterImage, showType } = anime.attributes;
      return (
        <LinkBoxAnime
          href={`/anime/${anime.id}`}
          key={anime.id}
          style={{ backgroundImage: `url(${posterImage.medium})` }}
        >

          <BoxDetail>
            <Title>{canonicalTitle}</Title>
            <Detail>
              <AnimeType>{showType}</AnimeType>
            </Detail>
          </BoxDetail>
        </LinkBoxAnime>
      );
    })}
  </GridContainer>);

class AnimeGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
      nextPageUrl: '',
    };
  }

  componentDidMount() {
    AnimeReact.fetchAnimeList()
      .then((animes) => {
        if (animes) {
          this.setState(() => ({
            animes: animes.data,
            nextPageUrl: animes.links.next,
          }));
        }
      });
  }

  render() {
    const animes = this.state.animes;

    return (
      <div>
        <div className="filter-nav">Filter Nav</div>
        <AnimeGridList animes={animes} />
      </div>
    );
  }
}

AnimeGridList.propTypes = {
  animes: PropTypes.array.isRequired,
};

export default AnimeGrid;
