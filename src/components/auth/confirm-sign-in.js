import React from 'react';
import { I18n } from '@aws-amplify/core';
import { ConfirmSignIn as BaseConfirmSignIn } from 'aws-amplify-react';
import { Typography, TextField } from '@material-ui/core';
import { object, string } from 'yup';
import { Layout, validator, LoadingButton } from './';

export default class ConfirmSignIn extends BaseConfirmSignIn {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors:  {} };

    this.validator = validator({
      validation: object({
        'code': string().required(I18n.get('Code is required'))
      }),
      inputs: this.inputs,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.confirm.bind(this),
      onChange: this.handleInputChange.bind(this),
      onError: this.setState.bind(this)
    });
  }

  /**
   * Reset the submit button on MFA failure.
   */
  error(err) {
    super.error(err);
    this.setState({ submitting: false });
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <button type='button' onClick={() => this.changeState('signIn')} className={classes.link}>
        {I18n.get('Back to sign-in')}
      </button>
    );
  }

  renderInfo() {
    if (this.state.mfaType === 'TOTP') {
      return (
        <Typography align='left'>
          {I18n.get('Please enter the code that appears on your software authenticator')}
        </Typography>
      );
    } else {
      return (
        <Typography align='left'>
          {I18n.get('Please enter the code received via SMS')}
        </Typography>
      );
    }
  }

  showComponent() {
    return (
      <Layout title={I18n.get('Confirm MFA code')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.validator.submit}>
          {this.renderInfo()}
          <TextField
            error={!!this.state.errors.code}
            helperText={this.state.errors.code || ''}
            label={I18n.get('Code')}
            onChange={this.validator.change}
            onBlur={this.validator.blur}
            name="code"
            margin="dense"
            fullWidth
            autoFocus={true} />

          <br/><br/>

          <LoadingButton
            submitting={this.state.submitting}>
            {I18n.get('Confirm')}
          </LoadingButton>
        </form>
      </Layout>
    );
  }
}