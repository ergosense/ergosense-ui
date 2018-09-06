import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import store, { history } from './helpers/store';

//import HomePage from './pages/home'
//import SitePage from './pages/site'
//import LoginPage from './pages/login'

/*
 | Authenticator components
 | ------------------------
 | Series of components that will work together
 | with the AWS amplify auth component. These are the "states"
 | of authentication.
 */
import {
  Authenticator,
  Init,
  SignIn,
  RequireNewPassword,
  ForgotPassword,
  VerifyContact,
  ConfirmSignIn,
  SignedIn,
  TOTPSetup
} from './components/auth/';

/*
 | Configuration
 | -------------
 | Load up configuration from the environment
 */
 import { default as config } from './config/default';

/*
 | Handling global errors
 | ----------------------
 | Global error handler, will listen to anything in the "error" key
 | of our redux state store.
 */
import ErrorHandler from './components/error-handler';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <ErrorHandler/>
          <Authenticator hideDefault={true}>
            <Init region={config.region} userPoolId={config.userPoolId} userPoolWebClientId={config.userPoolWebClientId}/>
            <SignIn/>
            <RequireNewPassword/>
            <ForgotPassword/>
            <VerifyContact/>
            <ConfirmSignIn/>
            <TOTPSetup/>
            <SignedIn>SIGNED IN!</SignedIn>
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