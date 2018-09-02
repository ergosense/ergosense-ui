import React from 'react';
import { Auth } from 'aws-amplify';
import { I18n, JS } from '@aws-amplify/core';
import { SignIn as AmplifySignIn} from 'aws-amplify-react';
import { TextField, Button, Grid } from '@material-ui/core';
import Layout from './layout';
import { State } from './';
import Form from './../form';
import { verify, login } from './actions';

class SignIn extends Form
{
  checkContact(user) {
      Auth.verifiedContact(user)
        .then(data => {
          if (JS.isEmpty(data.verified)) {
            this.props.setStep('verify', user);
          } else {
            this.props.setStep('loggedin', Object.assign(user, data));
          }
        });
  }

  handleSubmit(e) {
    super.handleSubmit(e);

    const { email, password } = this.state;

    Auth.signIn(email, password)
      .then(user => {
        switch (user.challengeName) {
          case 'SMS_MFA':
          case 'SOFTWARE_TOKEN_MFA':
            throw new Error('No MFA page');
          case 'NEW_PASSWORD_REQUIRED':
            throw new Error('No new password pagea');
          case 'MFA_SETUP':
            throw new Error('MFA not setup');
          default:
            this.checkContact(user);
        }

        this.release();
      });
  }

  render() {
    if (this.props.step !== 'loggedout') return null;

    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <TextField
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

          <TextField
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

          <br/><br/><br/>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.isSubmitting()}>
            Sign in
          </Button>
        </form>
      </Layout>
    );
  }
}

export default SignIn;