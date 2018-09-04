import React from 'react';
import { connect } from 'react-redux';
import { I18n, JS } from '@aws-amplify/core';
import { InputAdornment, Typography, CssBaseline, Paper, TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { STEP_RESET_VERIFY, STEP_RESET, createAction, resetForgottenPassword, forgotPassword } from './actions';
import Form from './../form';
import { Lock, Email } from '@material-ui/icons';
import IconTextField from './components/icon-text-field';
import state from './state';
import Layout from './layout';

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: 12,
    marginTop: 30,
    display: 'inline-block'
  }
});

class ResetPassword extends Form
{
  constructor(props) {
    super(props);
    this.renderCodeInput = this.renderCodeInput.bind(this);
    this.codeSent = this.codeSent.bind(this);
    this.backToSignIn = this.backToSignIn.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  backToSignIn(e) {
    e.preventDefault();
    this.props.dispatch({
      type: 'login-logged-out'
    });
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

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <a href="#" onClick={this.backToSignIn} className={classes.link}>
        Back to sign-in
      </a>
    );
  }

  render() {
    const { classes } = this.props;
    const { delivery } = this.state;

    return (
      <Layout title='Reset password' footer={(props) => this.renderFooter(props)}>
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
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

const component = connect(mapStateToProps)(withStyles(styles)(ResetPassword));

export default state(component, (props) => {
  const { type, error } = props;
  return (props.type === 'login-error' && (error && error.code === 'PasswordResetRequiredException')) || props.type === 'login-reset';
});