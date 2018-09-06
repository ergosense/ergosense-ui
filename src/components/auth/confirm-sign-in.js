import React from 'react';
import { I18n } from '@aws-amplify/core';
import { ConfirmSignIn as BaseConfirmSignIn } from 'aws-amplify-react';
import { Button, TextField } from '@material-ui/core';
import { object, string } from 'yup';
import { Layout, validator } from './';

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

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <button type='button' onClick={() => this.changeState('signIn')} className={classes.link}>
        {I18n.get('Back to sign-in')}
      </button>
    );
  }

  showComponent() {
    return (
      <Layout title='Confirm MFA code' footer={props => this.renderFooter(props)}>
        <form onSubmit={this.validator.submit}>
          <TextField
            error={!!this.state.errors.code}
            helperText={this.state.errors.code || ''}
            label={I18n.get('Code')}
            onChange={this.validator.change}
            onBlur={this.validator.blur}
            name="code"
            margin="dense"
            fullWidth />

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.submitting}
            fullWidth>
            {I18n.get('Confirm')}
          </Button>
        </form>
      </Layout>
    );
  }
}