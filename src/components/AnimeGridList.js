import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
const Type = styled.span`
  color: #53c4ff;
  font-weight: bold;
  text-transform: uppercase;
`;

const AverageRank = Type.extend`
  margin-left: 15px;
`;

class AnimeGridList extends React.Component {
  shouldComponentUpdate = nextProps => (
    nextProps.animes.length !== this.props.animes.length
  )

  render = () => (
    <GridContainer>
      {this.props.animes.map(({ id, attributes }) => {
        const { canonicalTitle, posterImage, showType, averageRating } = attributes;
        return (
          <LinkBoxAnime
            href={`/anime/${id}`}
            key={id}
            style={{ backgroundImage: `url(${posterImage.large})` }}
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
      })}
    </GridContainer>
  )
}

AnimeGridList.propTypes = {
  animes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AnimeGridList;
