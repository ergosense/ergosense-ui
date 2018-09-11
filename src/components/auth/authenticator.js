import React from 'react';
import { connect } from 'react-redux';
import { Authenticator as BaseAuthenticator, AmplifyTheme } from 'aws-amplify-react';
import { withStyles } from '@material-ui/core/styles';
import { ErrorMap } from './';

export const AUTH_STATE = 'auth-state';

const styles = theme => ({
  snackbar: {
    marginTop: theme.spacing.unit
  }
});

class Authenticator extends BaseAuthenticator {
  handleAuthEvent(state, event) {
    if (event.type === 'error') {
      const map = this.props.errorMessage || ErrorMap;
      const message = (typeof map === 'string') ? map : map(event.data);
      this.setState({ error: message });
    }

    this.props.dispatch({ type: AUTH_STATE, payload: this.state });
  }

  handleStateChange(state, data) {
    super.handleStateChange(state, data);

    // Forcefully update state object if the current state
    // is the same as before.
    if (state === this.state.auth) {
      this.setState({ authData: data });
    }
  }

  render() {
    const { auth, authData } = this.state;
    const theme = this.props.theme || AmplifyTheme;
    // TODO federated login
    // const { federated } = this.props;
    const props_children = this.props.children || [];

    const render_props_children = React.Children.map(props_children, (child, index) => {
      return React.cloneElement(child, {
        key: 'aws-amplify-authenticator-props-children-' + index,
        theme: theme,
        authState: auth,
        authData: authData,
        onStateChange: this.handleStateChange,
        onAuthEvent: this.handleAuthEvent,
        hide: false
      });
    });

    return (
      <div>
        {render_props_children}
        {auth === 'signedIn' && this.props.authData && this.props.component}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login, ...state.error };
};

export default connect(mapStateToProps)(withStyles(styles)(Authenticator));