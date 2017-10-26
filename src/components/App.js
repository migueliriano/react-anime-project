import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/Home';
import SingleAnimePage from 'containers/SingleAnimePage';

import configureStore from 'configureStore';

import 'index.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Switch>Home
        <Route exact path="/" component={Home} />
        <Route path="/anime/:id" component={SingleAnimePage} />
      </Switch>
    </MuiThemeProvider>
  </Provider>
);

export default App;
