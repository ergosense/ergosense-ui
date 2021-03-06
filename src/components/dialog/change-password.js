import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { validator } from './../auth';
import { object, string } from 'yup';

const styles = theme => ({});

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      currentPassword: '',
      newPassword: '',
      submitting: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.validator = validator({
      validation: object({
        'currentPassword': string().required(I18n.get('Current password is required')),
        'newPassword': string().required(I18n.get('New password is required'))
      }),
      parent: this,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.changePassword.bind(this),
      onChange: this.handleChange.bind(this),
      onError: this.setState.bind(this)
    });
  }

  componentDidUpdate(props) {
    // Reset the entire state when we reopen the dialog
    if (!props.open && this.props.open) {
      this.setState({ submitting: false, currentPassword: '', newPassword: '', errors: {} });
    }
  }

  close() {
    this.props.onClose();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changePassword() {
    const { user } = this.props;

    // Dismiss immediately
    this.props.onProgress();

    Auth.changePassword(user, this.state.currentPassword, this.state.newPassword)
      .then(() => {
        this.close();
        this.props.onSuccess();
      })
      .catch((err) => {
        this.close();
        this.props.onError((typeof err === 'string' || err instanceof String) ? new Error(err) : err);
      });
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog open={open} onClose={this.close}>
        <DialogTitle>Change account password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A good password will consist of x, y and Z. Do this and that and you will have a good password. Maybe even have an indicator here.
          </DialogContentText>
          <TextField
            error={!!this.state.errors.currentPassword}
            helperText={this.state.errors.currentPassword}
            autoFocus
            margin="dense"
            type="password"
            name="currentPassword"
            label="Current password"
            onBlur={this.validator.blur}
            onChange={this.validator.change}
            value={this.state.currentPassword}
            fullWidth/>
          <TextField
            error={!!this.state.errors.newPassword}
            helperText={this.state.errors.newPassword}
            margin="dense"
            type="password"
            name="newPassword"
            label="New password"
            onBlur={this.validator.blur}
            onChange={this.validator.change}
            value={this.state.newPassword}
            fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="primary">Cancel</Button>
          <Button type="button" variant="contained" color="primary" onClick={this.validator.submit}>Change</Button>
        </DialogActions>
      </Dialog>
    );
  }
};

ChangePassword.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(ChangePassword);