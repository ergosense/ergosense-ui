import React from 'react';
import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { ForgotPassword as BaseForgotPassword } from 'aws-amplify-react';
import { Lock, Email } from '@material-ui/icons';
import { Typography, TextField, Button } from '@material-ui/core';
import Layout from './../material-auth/layout';
import IconTextField from './../material-auth/components/icon-text-field';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  sentUsername: {
    color: theme.palette.secondary.main
  }
});

class ForgotPassword extends BaseForgotPassword {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false }

    this.renderFooter = this.renderFooter.bind(this);
    this.submitView = this.submitView.bind(this);
    this.sendView = this.sendView.bind(this);
    this.getSubmitTitle = this.getSubmitTitle.bind(this);
    this.send = this.send.bind(this);
    this.submit = this.submit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;

    return (
      <a href="#" onClick={() => this.changeState('signedOut')} className={classes.link}>
        {I18n.get('Back to sign-in')}
      </a>
    );
  }

  getSubmitTitle() {
    if (this.state.delivery) {
      return I18n.get('Change');
    } else {
      return I18n.get('Send Code');
    }
  }

  sendView() {
    const { classes } = this.props;
    return (
      <IconTextField
        icon={<Email color='action' style={{ fontSize: 20 }}/>}
        error={false}
        helperText={false}
        label={I18n.get('Email')}
        name="username"
        onChange={this.handleInputChange}
        margin="dense"
        fullWidth />
    );
  }

  submitView() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography align='left'>
          The code to reset your password has been sent to the following address: <font className={classes.sentUsername}>{this.inputs.username}</font>
        </Typography>
        <TextField
          error={false}
          helperText={false}
          label={I18n.get('Code')}
          name="code"
          onChange={this.handleInputChange}
          margin="dense"
          fullWidth />

        <TextField
          error={false}
          helperText={false}
          label={I18n.get('New password')}
          type="password"
          name="password"
          onChange={this.handleInputChange}
          margin="dense"
          fullWidth />
      </React.Fragment>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.delivery) {
      this.submit();
    } else {
      this.send();
    }
  }

  showComponent() {
    return (
      <Layout title={I18n.get('Reset password')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.handleSubmit}>
          { this.state.delivery ? this.submitView() : this.sendView() }

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.submitting}
            fullWidth>
            { this.getSubmitTitle() }
          </Button>
        </form>
      </Layout>
    );
  }
}

export default withStyles(styles)(ForgotPassword);