import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import AnimeGrid from 'containers/AnimeGrid';
import AnimeSinglePage from 'containers/AnimeSinglePage';

import 'index.css';

const AnimeGridRender = props => <AnimeGrid {...props} infiniteScroll />;

const App = () => (
  <MuiThemeProvider>
    <Switch>
      <Route exact path="/" render={AnimeGridRender} />
      <Route path="/anime/:id" component={AnimeSinglePage} />
    </Switch>
  </MuiThemeProvider>
);

export default App;
