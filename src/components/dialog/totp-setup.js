import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField } from '@material-ui/core';
import QRCode from './../auth/qr-code';
import { object, string } from 'yup';
import { validator, LoadingButton } from './../auth';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const styles = theme => ({
  qr: {
    maxWidth: 130,
    minWidth: 130,
    width: 128,
    height: 128,
    marginTop: 20,
    marginRight: 20
  },
  inputs: {
    paddingRight: 4
  }
});

class TOTPSetup extends Component {
  state = {
    alert: true, // By default we block the user until agreed
    submitting: false,
    errors: {},
    code: ''
  };

  constructor(props) {
    super(props);

    this.validator = validator({
      validation: object({
        'code': string().required(I18n.get('Code is required'))
      }),
      parent: this,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.verify.bind(this),
      onChange: this.handleStateChange.bind(this),
      onError: this.setState.bind(this)
    });

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  reset() {
    this.setState({ submitting: false, errors: {}, code: '' });
  }

  success() {
    this.reset();
    this.props.onSuccess();
  }

  error(err) {
    this.reset();
    this.props.onError(err);
  }

  handleStateChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  verify(e) {
    const { user } = this.props;

    Auth.verifyTotpToken(user, this.state.code)
      .then(() => {
        // set it to preferred mfa
        Auth.setPreferredMFA(user, 'TOTP')
          .then(() => this.success())
          .catch((err) => this.error(err));
      })
      .catch(err => this.error(err));
  }

  render() {
    const { classes, onDismiss, open, user } = this.props;

    return (
      <React.Fragment>
        <Dialog open={open} onClose={onDismiss}>
          <DialogTitle>Software authenticator association</DialogTitle>
          <DialogContent>
            <DialogContentText>
               Scan the generated QR code with your software authenticator, then enter the code and verify the association.
            </DialogContentText>
            <Grid container spacing={0}>
              <Grid item xs className={classes.qr}>
                <QRCode authData={user} />
              </Grid>
              <Grid item xs className={classes.inputs}>
                <TextField
                  error={!!this.state.errors.code}
                  helperText={this.state.errors.code}
                  margin="dense"
                  name="code"
                  label="Code"
                  onBlur={this.validator.blur}
                  onChange={this.validator.change}
                  value={this.state.code}
                  fullWidth/>

                <br/><br/>
                <Typography>
                  We suggest using the <a href="http://www.google.co.za">Google Authenticator</a> application.
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton onClick={this.validator.submit} color="primary" type="button" submitting={this.state.submitting}>
              Confirm
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TOTPSetup);