import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import ChangePassword from './../dialog/change-password';
import ConfigItem from './../helper/config-item';

const styles = theme => ({
});

class ItemPasswordChange extends Component {
  state = {
    open: false,
    enabled: false,
    submitting: false,
    initialized: false
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.error = this.error.bind(this);
    this.success = this.success.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    // Initialize component by reading the current value
    // from AWS
    Auth.getPreferredMFA(user)
      .then((res) => {
        // For now we only support software MFA due to SMS
        // having costs to consider
        this.setState({ initialized: true, enabled: (res === 'TOTP') || (res === 'SOFTWARE_TOKEN_MFA') });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  error(err) {
    // TODO dispatch global error
    console.log(err);

    // Invert the checked status, basically "resetting" it
    this.setState({ submitting: false, enabled: !this.state.enabled });
    this.close();
  }

  success() {
    // We assume the correct status has already been set
    // by the "on change" handler
    this.close();
    this.setState({ submitting: false });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { last, user } = this.props;

    return (
      <React.Fragment>
        <ConfigItem
          laste={last}
          primary="Account password"
          secondary="**********"
          actions={() =>
            <Button size="small" onClick={this.open}>
              Change
            </Button>
          }/>

        {/* Change password dialog */}
        <ChangePassword
          user={user}
          open={this.state.open || false}
          onClose={this.close}
          onSuccess={this.success}
          onError={this.error}/>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(ItemPasswordChange);
