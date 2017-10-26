import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from 'style/base';
import Logo from 'components/Logo';

import AnimeGrid from '../AnimeGrid';

const HomePageContainer = styled.div``;

const Home = (props) => {
  const { animes, isFeching } = props;
  const { fetchAnimesList, fetchNextPageAnimeList } = props.actions;
  return (
    <HomePageContainer>
      <Header>
        <Logo />
      </Header>
      {/* <div className="filter-nav">Filter Nav</div> */}
      <AnimeGrid
        animes={animes}
        fetchNextPageAnimeList={fetchNextPageAnimeList}
        fetchAnimesList={fetchAnimesList}
        isFeching={isFeching}
      />
    </HomePageContainer>
  );
};

Home.propTypes = {
  animes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFeching: PropTypes.bool.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Home;
