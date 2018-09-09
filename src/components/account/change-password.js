import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { InputLabel, InputAdornment, Input, Switch } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { validator, LoadingButton } from './../auth';
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

  close() {
    // Reset the entire state
    this.setState({ submitting: false, currentPassword: '', newPassword: '', errors: {} });
    this.props.onClose();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changePassword() {
    const { user } = this.props;

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
    const { classes, open } = this.props;
    const { editNumber, number } = this.state;

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
          <Button onClick={this.close} color="primary">
            Cancel
          </Button>
          <LoadingButton onClick={this.validator.submit} color="primary" type="button" submitting={this.state.submitting}>
            Change
          </LoadingButton>
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
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(ChangePassword);