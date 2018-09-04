import React from 'react';
import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { SignIn as BaseSignIn } from 'aws-amplify-react';
import { Lock, Email } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Layout from './../material-auth/layout';
import IconTextField from './../material-auth/components/icon-text-field';
import { object, string } from 'yup';

export default class SignIn extends BaseSignIn {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, validationErrors: 0 }
  }

  validationErrors(err) {
    this.setState({ errors: err.inner });
  }

  hasError(field) {
    return !!this.state.errors.find(i => (i.path === field));
  }

  getErrors(field) {
    const err = this.state.errors.find(i => (i.path === field));
    return err ? err.message : '';
  }

  signIn(e) {
    e.preventDefault();

    // Check for validation errors
    if (this.state.validationErrors) return;

    return super.signIn();
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <a href="#" onClick={() => this.changeState('forgotPassword')} className={classes.link}>
        Forgot your password?
      </a>
    );
  }

  showComponent() {
    return (
      <Layout title='Sign in' footer={props => this.renderFooter(props)}>
        <form onSubmit={this.signIn}>
          <IconTextField
            icon={<Email/>}
            validation={string().required('Email is required').email('Email is invalid')}
            label="Email"
            name="username"
            parent={this}
            margin="dense"
            fullWidth
            />

          <IconTextField
            icon={<Lock/>}
            parent={this}
            validation={string().required('Password is required').min(8, 'Invalid password length')}
            type="password"
            label={I18n.get('Password')}
            name="password"
            margin="dense"
            fullWidth
            />

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.submitting}
            fullWidth>
            Sign in
          </Button>


        </form>
      </Layout>
    );
  }
}