import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { VerifiedUser } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';

import { LoadingButton } from './../../components/auth';
import VerifyEmail from './../../components/dialog/verify-email';
import ConfigItem from './../../components/helper/config-item';

const EMPTY_CHAR = '-';

const styles = theme => ({
  wrapper: {
    margin: 0
  },
  verification: {
    fontSize: 14,
    marginBottom: -2,
    color: green[400]
  }
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
    this.progress = this.progress.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ initialized: false });

    // Initialize component by reading the current value from AWS
    Auth.verifiedContact(user)
      .then((res) => this.success({ email: res.verified.email || res.unverified.email, verified: !!res.verified.email }))
      .catch((err) => this.error(err));
  }

  error(err) {
    // TODO dispatch global error
    console.log("WHY")
    console.log(err);

    // Invert the checked status, basically "resetting" it
    this.setState({ submitting: false });
  }

  success(obj) {
    this.setState({ submitting: false, initialized: true, ...obj });
  }

  progress() {
    this.setState({ submitting: true });
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  renderEmail() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <VerifiedUser className={ classes.verification }/><span>{this.state.email}</span>
      </React.Fragment>
    );
  }

  render() {
    const { last, classes } = this.props;

    return (
      <React.Fragment>
        <ConfigItem
          last={last}
          primary={I18n.get('Primary email address')}
          secondary={this.renderEmail.bind(this)()}
          actions={() =>
            <LoadingButton
              classes={{ wrapper: classes.wrapper }}
              variant="text"
              color="default"
              size="small"
              onClick={this.open}
              disabled={this.state.submitting || !this.state.initialized || this.state.verified}
              submitting={this.state.submitting}>
              {I18n.get('Verify')}
            </LoadingButton>
        } />

        {/* TOTP configuration dialog */}
        <VerifyEmail
          user={this.props.user}
          open={this.state.open || false}
          onDismiss={this.error}
          onError={this.error}
          onSuccess={this.success}
          onProgress={this.progress}
          onClose={() => this.close() }/>
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(ItemEmail);
