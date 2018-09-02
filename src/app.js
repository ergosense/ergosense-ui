import './config/aws'

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import store, { history } from './helpers/store'
import HomePage from './pages/home'
import SitePage from './pages/site'
import LoginPage from './pages/login'
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import MaterialAuth from './components/material-auth';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <MaterialAuth>
          hello
        </MaterialAuth>
      </Provider>
    );
  }
  /*
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/site' exact component={SitePage} />
              <Route path='/login' exact component={LoginPage} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </React.Fragment>
    );
  }
  */
}

export default App;
