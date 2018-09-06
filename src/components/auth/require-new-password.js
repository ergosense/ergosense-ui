import React from 'react';
import { I18n } from '@aws-amplify/core';
import { RequireNewPassword as BaseRequireNewPassword } from 'aws-amplify-react';
import { Lock } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';
import { object, string } from 'yup';
import { IconWrapper, Layout, validator } from './';

export default class RequireNewPassword extends BaseRequireNewPassword {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} }

    this.change = this.change.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    // TODO make HOC
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
            icon={(defaults) => <Lock {...defaults}/>}
            content={() => <TextField
              error={!!this.state.errors.password}
              helperText={this.state.errors.password || ''}
              type="password"
              name="password"
              label={I18n.get('New Password')}
              onBlur={this.validator.blur}
              onChange={this.validator.change}
              margin="dense"
              fullWidth />
            }/>

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.submitting}
            fullWidth>
            {I18n.get('Change')}
          </Button>
        </form>
      </Layout>
    );
  }
}