import React from 'react';
import { connect } from 'react-redux';
import { Authenticator as BaseAuthenticator, AmplifyTheme, AmplifyMessageMap } from 'aws-amplify-react';
import { Snackbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  snackbar: {
    marginTop: theme.spacing.unit
  }
});

class Authenticator extends BaseAuthenticator {
  handleAuthEvent(state, event) {
    super.handleAuthEvent(state, event);

    if (event.type === 'error') {
      this.props.dispatch({
        type: 'LOGIN_ERROR',
        error: event.data // TODO map error message
      });
    }
  }

  render() {
    const { auth, authData } = this.state;
    const theme = this.props.theme || AmplifyTheme;
    const messageMap = this.props.errorMessage || AmplifyMessageMap;
    const { federated } = this.props;
    const props_children = this.props.children || [];

    const render_props_children = React.Children.map(props_children, (child, index) => {
      return React.cloneElement(child, {
        key: 'aws-amplify-authenticator-props-children-' + index,
        theme: theme,
        messageMap: messageMap,
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login, ...state.error };
};

export default connect(mapStateToProps)(withStyles(styles)(Authenticator));