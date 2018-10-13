import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from 'style/base';
import Logo from 'components/modules/Logo';

import NavBar from 'components/modules/NavBar';
import SearchInput from 'components/modules/SearchInput';
import AnimeGrid from 'components/modules/AnimeGrid';

const HomePageContainer = styled.div``;

const Home = (props) => {

  const { 
    animeList: { animes, isFeching: animeListisfeching },
    searchAnime: { animes: searchAnimeResult, isFeching: searchAnimeisfeching }
  } = props;

  const { 
     fetchAnimesListIfIsNeeded,
     fetchNextPageAnimeList,
     fetchSearchAnime 
  } = props.actions;
  return (
    <HomePageContainer>
      <Header>
        <Logo />
      </Header>
      <NavBar>
        <SearchInput 
          dataSource={searchAnimeResult}
          isFeching={searchAnimeisfeching}
          fetchSearchAnime={fetchSearchAnime}
        />
      </NavBar>
      <AnimeGrid
        animes={animes}
        fetchNextPageAnimeList={fetchNextPageAnimeList}
        fetchAnimesListIfIsNeeded={fetchAnimesListIfIsNeeded}
        isFeching={animeListisfeching}
      />
    </HomePageContainer>
  );
};

Home.propTypes = {
  animeList: PropTypes.object.isRequired,
  searchAnime: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Home;
