import React from 'react';
import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { RequireNewPassword as BaseRequireNewPassword } from 'aws-amplify-react';
import { Lock, Email } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Layout from './../material-auth/layout';
import IconTextField from './../material-auth/components/icon-text-field';

export default class RequireNewPassword extends BaseRequireNewPassword {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false }

    this.change = this.change.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  change(e) {
    e.preventDefault();
    super.change();
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <a href="#" onClick={() => this.changeState('signedOut')} className={classes.link}>
        {I18n.get('Back to sign-in')}
      </a>
    );
  }

  showComponent() {
    return (
      <Layout title={I18n.get('Change password')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.change}>
          <IconTextField
            icon={<Lock color='action' style={{ fontSize: 20 }}/>}
            error={false}
            helperText={false}
            type="password"
            label={I18n.get('New Password')}
            name="password"
            onChange={this.handleInputChange}
            margin="normal"
            fullWidth
            />

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.submitting}
            fullWidth>
            Change
          </Button>
        </form>
      </Layout>
    );
  }
}