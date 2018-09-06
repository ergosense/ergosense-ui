import React from 'react';
import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { TOTPSetup as BaseTOTPSetup } from 'aws-amplify-react';
import { Typography, TextField, Button } from '@material-ui/core';
import QRCode from './qr-code';
import { object, string } from 'yup';
import { Layout, validator } from './';

export default class TOTPSetup extends BaseTOTPSetup {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} };

    this.checkContact = this.checkContact.bind(this);
    this.verifyTotpToken = this.verifyTotpToken.bind(this);

    this.validator = validator({
      validation: object({
        'code': string().required(I18n.get('Code is required'))
      }),
      inputs: this.inputs,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.verifyTotpToken.bind(this),
      onChange: this.handleInputChange.bind(this),
      onError: this.setState.bind(this)
    })
  }

  renderFooter(layoutProps) {
    return null;
  }

  verifyTotpToken(e) {
    const user = this.props.authData;
    const { code } = this.inputs;

    Auth.verifyTotpToken(user, code)
      .then(() => {
        // set it to preferred mfa
        Auth.setPreferredMFA(user, 'TOTP');
        this.setState({ setupMessage: 'Setup TOTP successfully!' });
        console.log('set up totp success!');
        //logger.debug('set up totp success!');
        this.checkContact(user);
      })
      .catch(err => {
        this.setState({ setupMessage: 'Setup TOTP failed!' });
        console.log(err);
        //logger.error(err);
      });
  }

  showComponent() {
    return (
      <Layout title={I18n.get('MFA configuration')} footer={props => this.renderFooter(props)}>
        <Typography align='left'>
          Use your <a href="">software authenticator</a> to scan the QR code and associate it with your account.
        </Typography>
        <form onSubmit={this.validator.submit}>
          <QRCode {...this.props} />
          <TextField
            error={!!this.state.errors.code}
            helperText={this.state.errors.code || ''}
            label={I18n.get('Code')}
            onChange={this.valdiator.change}
            onBlur={this.valdiator.blur}
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
            {I18n.get('Verify security token')}
          </Button>
        </form>
      </Layout>
    );
  }
}