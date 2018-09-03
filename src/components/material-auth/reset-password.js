import React from 'react';
import { connect } from 'react-redux';
import { I18n, JS } from '@aws-amplify/core';
import { InputAdornment, Typography, CssBaseline, Paper, TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { STEP_RESET_VERIFY, STEP_RESET, createAction, resetForgottenPassword, forgotPassword } from './actions';
import Form from './../form';
import { Lock, Email } from '@material-ui/icons';
import IconTextField from './components/icon-text-field';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

class ResetPassword extends Form
{
  constructor(props) {
    super(props);
    this.renderCodeInput = this.renderCodeInput.bind(this);
    this.codeSent = this.codeSent.bind(this);
    this.valid = this.valid.bind(this);
  }

  handleSubmit(e) {
    super.handleSubmit(e);

    console.log('SUBMIT HIT!!!');

    const { email, code, password } = this.state;

    if (!code) {
      forgotPassword(email, this.props.dispatch)
        .then(data => {
          this.setState({ delivery: data });
          this.release();
        });
    } else {
      resetForgottenPassword(email, code, password, this.props.dispatch)
        .then(data => {
          console.log(data);
          this.setState({ delivery: null });
          this.release();
        })
    }
  }

  codeSent() {
    return !!this.state.delivery;
  }

  renderCodeInput() {
    if (!this.codeSent()) return null;

    return (
      <React.Fragment>
        <IconTextField
          icon={<Email color='action' style={{ fontSize: 20 }}/>}
          error={false}
          helperText={''}
          label="Code"
          name="code"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.code || ''}
          margin="normal"
          fullWidth
          autoFocus={true}
          />

        <TextField
          error={false}
          helperText={''}
          label="Password"
          name="password"
          type="password"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.state.password || ''}
          margin="normal"
          fullWidth
          />
      </React.Fragment>
    );
  }

  valid(type, error) {
    return type === 'login-error' && error.code === 'PasswordResetRequiredException';
  }

  render() {
    const { error, classes, type } = this.props;
    console.log(this.props);
    if (!this.valid(type, error)) return null;

    const { delivery } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">Reset password</Typography>
            <form onSubmit={this.handleSubmit}>
              <IconTextField
                icon={<Email color='action' style={{ fontSize: 20 }}/>}
                error={false}
                helperText={''}
                label="Email"
                name="email"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.email || ''}
                margin="normal"
                fullWidth
                disabled={this.codeSent()}
                />

              {this.renderCodeInput()}

              <br/><br/>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.isSubmitting()}
                fullWidth>
                Send code
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(ResetPassword));