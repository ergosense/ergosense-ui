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

import { Hub } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import MaterialAuth from './components/material-auth';

import Authenticator from './components/auth/authenticator';
import Init from './components/auth/init';
import SignIn from './components/auth/signin';
import RequireNewPassword from './components/auth/new-password';
import ForgotPassword from './components/auth/forgot-password';
import VerifyContact from './components/auth/verify-contact';

import ErrorHandler from './components/error-handler';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <ErrorHandler/>
          <Authenticator hideDefault={true}>
            <Init/>
            <SignIn/>
            <RequireNewPassword/>
            <ForgotPassword/>
            <VerifyContact/>
          </Authenticator>
        </React.Fragment>
      </Provider>
    );
  }

  /*
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
          <MaterialAuth>
            hello
          </MaterialAuth>
        </Provider>
      </React.Fragment>
    );
  }
  */
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