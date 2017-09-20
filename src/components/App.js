import React from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

const App = () => (
  <MuiThemeProvider>
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <AnimeGrid />
    </Wrapper>
  </MuiThemeProvider>
);

export default App;
