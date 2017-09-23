import React from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import AnimeGrid from 'containers/AnimeGrid';
import AnimeSinglePage from 'components/AnimeSinglePage';

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

const AnimeGridRender = props => <AnimeGrid {...props} />;

const App = () => (
  <MuiThemeProvider>
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <Switch>
        <Route exact path="/" render={AnimeGridRender} />
        <Route path="/anime/:id" component={AnimeSinglePage} />
      </Switch>
    </Wrapper>
  </MuiThemeProvider>
);

export default App;
