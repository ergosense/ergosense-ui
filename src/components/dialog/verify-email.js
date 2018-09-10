import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { validator, LoadingButton } from './../auth';
import { object, string } from 'yup';

const styles = theme => ({
  secondary: {
    color: theme.palette.secondary.main
  }
});

class VerifyEmail extends Component {
  state = {
    submitting: false,
    code: '',
    codeSent: false,
    errors: {}
  };

  constructor(props) {
    super(props);

    this.validator = validator({
      validation: object({
        'code': string().when('$codeSent', (codeSent, schema) => (codeSent ? schema.required(I18n.get('Code is required')) : schema))
      }),
      parent: this,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.verify.bind(this),
      onChange: this.handleChange.bind(this),
      onError: this.setState.bind(this)
    });

    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
  }

  reset() {
    // Reset the entire state
    this.setState({ submitting: false, code: '', errors: {} });
  }

  close() {
    this.reset();
    this.props.onClose();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  verify() {
    const { onSuccess, onError } = this.props;

    console.log('SUBMIT!');
    console.log(this.state);

    if (this.state.codeSent && this.state.code) {
      Auth.verifyCurrentUserAttributeSubmit('email', this.state.code)
        .then(data => (this.close() && onSuccess(data)))
        .catch(err => (this.close() && onError(err)));
    } else {
      Auth.verifyCurrentUserAttribute('email')
        .then(data => {
          // Set the state so the component awaits the entry
          // of the "verification code"
          this.setState({ codeSent: true, submitting: false, errors: {}, code: '' });
        })
        .catch(err => (this.close() && onError(err)));
    }
  }

  renderSubmit() {
    return this.state.codeSent ? 'Verify' : 'Send Code';
  }

  render() {
    const { open, user, classes } = this.props;

    return (
      <Dialog open={open} onClose={this.close}>
        <DialogTitle>Verify email address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Email address: <span className={classes.secondary}>{user.attributes && user.attributes.email}</span>
          </DialogContentText>
          {this.state.codeSent &&
            <TextField
              error={!!this.state.errors.code}
              helperText={this.state.errors.code || 'Enter the verification code received'}
              autoFocus
              margin="dense"
              name="code"
              label="Verification code"
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              value={this.state.currentPassword}
              fullWidth/>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="primary">
            Cancel
          </Button>
          <LoadingButton onClick={this.validator.submit} color="primary" type="button" submitting={this.state.submitting}>
            {this.renderSubmit()}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
};

export default withStyles(styles)(VerifyEmail);