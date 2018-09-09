import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './helpers/store';

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

/*
 | Routes
 | ------
 | Import the application routing component
 */
import Routes from './routes';

/*
| Theme
| -----
| Custom Material UI overrides
*/
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorHandler/>
          <Authenticator hideDefault={true} component={<Routes />}>
            <Init region={config.region} userPoolId={config.userPoolId} userPoolWebClientId={config.userPoolWebClientId}/>
            <SignIn/>
            <RequireNewPassword/>
            <ForgotPassword/>
            <VerifyContact/>
            <ConfirmSignIn/>
            <TOTPSetup/>
          </Authenticator>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;