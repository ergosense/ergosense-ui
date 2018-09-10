import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

import TOTPSetup from './../dialog/totp-setup';
import ConfigItem from './../helper/config-item';

const styles = theme => ({
});

class ItemMFAToggle extends Component {
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
    this.toggle = this.toggle.bind(this);

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

  toggle(e, checked) {
    const { user } = this.props;
    this.setState({ submitting: true, enabled: checked });

    // Handle "disable" event
    if (!checked) {
      return Auth.setPreferredMFA(user, 'NOMFA')
        .then(() => this.success())
        .catch((err) => this.error(err));
    }

    // If "enabled", first associate a new MFA device
    // to the account in order to overwrite any lingering
    // old connection.
    this.open();
  }

  render() {
    const { last, user } = this.props;

    return (
      <React.Fragment>
        <ConfigItem
          last={last}
          primary="Enable MFA"
          secondary="What is MFA. FInd out more now?"
          actions={() =>
            <Switch
              disabled={this.state.submitting || !this.state.initialized}
              checked={this.state.enabled}
              onChange={this.toggle}/>
          }/>

        {/* TOTP configuration dialog */}
        <TOTPSetup
          user={user}
          open={this.state.open || false}
          onDismiss={this.error}
          onError={this.error}
          onSuccess={this.success}/>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(ItemMFAToggle);
