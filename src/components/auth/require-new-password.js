import React from 'react';
import { I18n } from '@aws-amplify/core';
import { RequireNewPassword as BaseRequireNewPassword } from 'aws-amplify-react';
import { Lock } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import { object, string } from 'yup';
import { IconWrapper, Layout, validator, LoadingButton } from './';

export default class RequireNewPassword extends BaseRequireNewPassword {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} }

    this.change = this.change.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    this.validator = validator({
      validation: object({
        'password': string().required(I18n.get('Password is required'))
      }),
      inputs: this.inputs,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.change.bind(this),
      onChange: this.handleInputChange.bind(this),
      onError: this.setState.bind(this)
    });
  }

  /**
   * Skip user verification on login.
   */
  checkContact(user) {
    this.changeState('signedIn', user);
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
      <button type='button' onClick={() => this.changeState('signedOut')} className={classes.link}>
        {I18n.get('Back to sign-in')}
      </button>
    );
  }

  showComponent() {
    return (
      <Layout title={I18n.get('Change password')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.validator.submit}>

          <IconWrapper
              error={!!this.state.errors.password}
            icon={(defaults) => <Lock {...defaults}/>}
            content={(defaults) => <TextField
              helperText={this.state.errors.password || ''}
              type="password"
              name="password"
              label={I18n.get('New Password')}
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              margin="dense"
              fullWidth
              {...defaults} />
            }/>

          <br/><br/>

          <LoadingButton
            submitting={this.state.submitting}>
            {I18n.get('Change')}
          </LoadingButton>
        </form>
      </Layout>
    );
  }
}