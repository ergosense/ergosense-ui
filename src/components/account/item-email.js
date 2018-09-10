import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import VerifyEmail from './../dialog/verify-email';
import ConfigItem from './../helper/config-item';

const EMPTY_CHAR = '-';

const styles = theme => ({
});

class ItemEmail extends Component {
  state = {
    open: false,
    enabled: false,
    submitting: false,
    initialized: false,
    email: EMPTY_CHAR
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
    this.setState({ initialized: false });

    console.log('DO SOMETHING');
    // Initialize component by reading the current value
    // from AWS
    Auth.verifiedContact(user)
      .then((res) => this.success(res))
      .catch((err) => this.error(err));
  }

  error(err) {
    // TODO dispatch global error
    console.log("WHY")
    console.log(err);

    // Invert the checked status, basically "resetting" it
    this.setState({ submitting: false, enabled: !this.state.enabled });
    this.close();
  }

  success(res) {
    console.log(res);
    const verified = res.verified.email;
    const unverified = res.unverified.email;

    // Assign state variables
    this.setState({ email: verified || unverified, verified: !!verified });

    this.close();
    this.setState({ submitting: false, initialized: true });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { last } = this.props;

    return (
      <React.Fragment>
        <ConfigItem
          last={last}
          primary="Primary email address"
          secondary={this.state.email}
          actions={() =>
            <Button
              size="small"
              disabled={this.state.submitting || !this.state.initialized || this.state.verified}
              onClick={this.open}>
              Verify
            </Button>
        } />

        {/* TOTP configuration dialog */}
        <VerifyEmail
          user={this.props.user}
          open={this.state.open || false}
          onDismiss={this.error}
          onError={this.error}
          onSuccess={this.success}
          onClose={() => this.close() }/>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(ItemEmail);
