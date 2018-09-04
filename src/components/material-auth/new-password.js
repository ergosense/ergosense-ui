import React from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { I18n, JS } from '@aws-amplify/core';
import { InputAdornment, Typography, CssBaseline, Paper, TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { STEP_NEW_PASSWORD, newPassword } from './actions';
import Form from './../form';
import { Lock, Email } from '@material-ui/icons';
import IconTextField from './components/icon-text-field';
import state from './state';
import Layout from './layout';

const styles = (theme) => ({
});

class NewPassword extends Form
{
  constructor(props) {
    super(props);
    this.checkUser = this.checkUser.bind(this);
  }

  handleSubmit(e) {
    super.handleSubmit(e);

    const { password } = this.state;
    const { user } = this.props;
    const { requiredAttributes } = user.challengeParam;

    Auth.completeNewPassword(user, password, requiredAttributes)
      .then(user => {
        // If the challenge name is unchanged, we assume no further
        // steps are to be made on the user.
        if (user.challengeName !== 'NEW_PASSWORD_REQUIRED') {
          user.challengeName = null;
        }

        this.props.dispatch({
          type: 'login-signed-in',
          user: user
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout title='Change password'>
        <form onSubmit={this.handleSubmit}>
          <IconTextField
            icon={<Lock color='action' style={{ fontSize: 20 }}/>}
            error={false}
            helperText={false}
            type="password"
            label="New password"
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
            Change
          </Button>
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

const component = connect(mapStateToProps)(withStyles(styles)(NewPassword));

export default state(component, (props) => {
  const { type, user } = props;
  return type === 'login-signed-in' && user.challengeName === 'NEW_PASSWORD_REQUIRED';
});