import React from 'react';
import { I18n } from '@aws-amplify/core';
import { SignIn as BaseSignIn } from 'aws-amplify-react';
import { Lock, Email } from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core';
import { object, string } from 'yup';
import { IconWrapper, Layout, LoadingButton, validator } from './';

export default class SignIn extends BaseSignIn {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} }

    /// TODO make HOC
    this.validator = validator({
      validation: object({
        'username': string().required(I18n.get('Email is required')).email(I18n.get('Email is invalid')),
        'password': string().required(I18n.get('Password is required'))
      }),
      inputs: this.inputs,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.signIn.bind(this),
      onChange: this.handleInputChange.bind(this),
      onError: this.setState.bind(this)
    });
  }

  componentDidUpdate(props, prevState) {
    // Clear submitting status when we have navigated away from the page
    if (!this._validAuthStates.includes(this.props.authState) && this.state.submitting) {
      this.setState({ submitting: false });
    }
  }

  error(err) {
    super.error(err);
    this.setState({ submitting: false });
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <button type='button' onClick={() => this.changeState('forgotPassword')} className={classes.link}>
        {I18n.get('Forgot your password?')}
      </button>
    );
  }

  showComponent() {
    return (
      <Layout title='Sign in' footer={props => this.renderFooter(props)}>
        <form onSubmit={this.validator.submit}>
          <IconWrapper
            icon={(defaults) => <Email {...defaults}/>}
            content={() => <TextField
              error={!!this.state.errors.username}
              helperText={this.state.errors.username || ''}
              label={I18n.get('Email')}
              name="username"
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              margin="dense"
              fullWidth />
            }/>

          <IconWrapper
            icon={(defaults) => <Lock {...defaults}/>}
            content={() => <TextField
              error={!!this.state.errors.password}
              helperText={this.state.errors.password || ''}
              label={I18n.get('Password')}
              name="password"
              type="password"
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              margin="dense"
              fullWidth />
            }/>

          <br/><br/>

          <LoadingButton
            submitting={this.state.submitting}>
            {I18n.get('Sign in')}
          </LoadingButton>
        </form>
      </Layout>
    );
  }
}