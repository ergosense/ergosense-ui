import React from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { I18n, JS } from '@aws-amplify/core';
import { InputAdornment, Typography, CssBaseline, Paper, TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { STEP_LOGGED_OUT, STEP_RESET, createAction, login } from './actions';
import Form from './../form';
import { Lock, Email } from '@material-ui/icons';
import IconTextField from './components/icon-text-field';
import Layout from './layout';
import state from './state';

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: 12,
    marginTop: 30,
    display: 'inline-block'
  }
});

class SignIn extends Form {
  constructor(props){
    super(props);

    this.forgotPassword = this.forgotPassword.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  forgotPassword(e) {
    e.preventDefault();
    this.props.dispatch({
      type: 'login-reset'
    });
  }

  handleSubmit(e) {
    super.handleSubmit(e);

    const { email, password } = this.state;

    login(email, password)
      .then((user) => this.props.dispatch({
        type: 'login-signed-in',
        user: user
      }))
      .catch(err => {
        this.release();

        this.props.dispatch({
          type: 'login-error',
          error: err
        });
      });
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <a href="#" onClick={this.forgotPassword} className={classes.link}>
        Forgot your password?
      </a>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout title='Sign in' footer={props => this.renderFooter(props)}>
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
            />

          <IconTextField
            icon={<Lock color='action' style={{ fontSize: 20 }}/>}
            error={false}
            helperText={false}
            type="password"
            label="Password"
            name="password"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.state.password || ''}
            margin="normal"
            fullWidth
            />

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.isSubmitting()}
            fullWidth>
            Sign in
          </Button>


        </form>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

const component = connect(mapStateToProps)(withStyles(styles)(SignIn));

export default state(component, (props) => {
  return props.type === 'login-logged-out';
});