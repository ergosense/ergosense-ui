import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { validator, LoadingButton } from './../auth';
import { object, string } from 'yup';

const styles = theme => ({});

class EditPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      phoneNumber: '',
      submitting: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.changeNumber = this.changeNumber.bind(this);

    this.validator = validator({
      validation: object({
        'phoneNumber': string().required(I18n.get('Phone number is required'))
      }),
      parent: this,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.changeNumber.bind(this),
      onChange: this.handleChange.bind(this),
      onError: this.setState.bind(this)
    });
  }

  close() {
    // Reset the entire state
    this.setState({ submitting: false, phoneNumber: '', errors: {} });
    this.props.onClose();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeNumber() {
    this.close();
    this.props.onSuccess();
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog open={open} onClose={this.close}>
        <DialogTitle>Edit phone number</DialogTitle>
        <DialogContent>
          <TextField
            error={!!this.state.errors.phoneNumber}
            helperText={this.state.errors.phoneNumber}
            autoFocus
            margin="dense"
            name="phoneNumber"
            label="Phone number"
            onBlur={this.validator.blur}
            onChange={this.validator.change}
            value={this.state.phoneNumber}
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

EditPhoneNumber.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(EditPhoneNumber);