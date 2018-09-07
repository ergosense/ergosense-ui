import React from 'react';
import { I18n } from '@aws-amplify/core';
import { SignIn as BaseSignIn } from 'aws-amplify-react';
import { Lock, Email } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import { object, string } from 'yup';
import { IconWrapper, Layout, LoadingButton, validator } from './';

export default class SignIn extends BaseSignIn {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} };

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

  /**
   * Clear submitting status when we have navigated away from the page.
   * We do this so that if someone clicks "back to sign-in", we don't have a dead
   * submit button.
   */
  componentDidUpdate(props, prevState) {
    if (!this._validAuthStates.includes(this.props.authState) && this.state.submitting) {
      this.setState({ submitting: false });
    }
  }

  /**
   * Reset submit state upon submission errors
   */
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

  /**
   * Ensure that if someone clicks "back to sign-in" we reset
   * the original input fields, this will ensure the validation runs
   * successfully and no old "ghost" inputs are floating around. This is
   * a hack to deal with the fact that AWS Amplify uses this.inputs instead of
   * this.state to manage the input fields.
   */
  changeState(state, data) {
    super.changeState(state, data);
    Object.keys(this.inputs).forEach(k => (this.inputs[k] = ''));
  }

  showComponent() {
    return (
      <Layout title='Sign in' footer={props => this.renderFooter(props)}>
        <form onSubmit={this.validator.submit}>
          <IconWrapper
            error={!!this.state.errors.username}
            icon={(defaults) => <Email {...defaults}/>}
            content={(defaults) => <TextField
              helperText={this.state.errors.username || ''}
              label={I18n.get('Email')}
              name="username"
              value={this.state.username}
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              {...defaults} />
            }/>

          <IconWrapper
            error={!!this.state.errors.password}
            icon={(defaults) => <Lock {...defaults}/>}
            content={(defaults) => <TextField
              helperText={this.state.errors.password || ''}
              label={I18n.get('Password')}
              name="password"
              type="password"
              value={this.state.password}
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              {...defaults} />
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