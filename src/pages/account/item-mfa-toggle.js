import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

import TOTPSetup from './../../components/dialog/totp-setup';
import ConfigItem from './../../components/helper/config-item';

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
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    const { user } = this.props;

    // Initialize component by reading the current value from AWS
    this.setState({ initialized: true, enabled: user.preferredMFA === 'SOFTWARE_TOKEN_MFA' });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  error(err) {
    if (!this._mounted) return;
    // TODO dispatch global error
    console.log(err);

    // Invert the checked status, basically "resetting" it
    this.setState({ submitting: false, enabled: !this.state.enabled });
    this.close();
  }

  success() {
    if (!this._mounted) return;
    // We assume the correct status has already been set
    // by the "on change" handler
    this.close();
    this.setState({ submitting: false });
  }

  open() {
    if (!this._mounted) return;
    this.setState({ open: true });
  }

  close() {
    if (!this._mounted) return;
    this.setState({ open: false });
  }

  toggle(e, checked) {
    if (!this._mounted) return;

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

  renderSecondary() {
    return (
      <React.Fragment>
        {I18n.get('Enabling this will require you to enter an additional code at login')}. <a href="http://google.com" target="_blank" rel="noopener noreferrer">{I18n.get('What is MFA?')}</a>
      </React.Fragment>
    );
  }

  render() {
    const { last, user } = this.props;

    return (
      <React.Fragment>
        <ConfigItem
          last={last}
          primary={I18n.get('Enable MFA')}
          secondary={this.renderSecondary()}
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
