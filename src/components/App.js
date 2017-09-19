import React from 'react';
import styled from 'styled-components';

import AnimeGrid from 'containers/AnimeGrid';

import 'index.css';
import Logo from './Logo';

const Wrapper = styled.section`
  padding: 0;
  margin: 0;
`;

const Header = styled.header`
  text-align: center;
  padding-top: 30px;
`;

const App = () =>
  (<Wrapper>
    <Header>
      <Logo />
    </Header>
    <AnimeGrid />
  </Wrapper>);

export default App;
