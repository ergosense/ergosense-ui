import React from 'react';
import { I18n } from '@aws-amplify/core';
import { ForgotPassword as BaseForgotPassword } from 'aws-amplify-react';
import { Email } from '@material-ui/icons';
import { Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'yup';
import { validator, IconWrapper, Layout } from './';

const styles = (theme) => ({
  sentUsername: {
    color: theme.palette.secondary.main
  }
});

class ForgotPassword extends BaseForgotPassword {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} }

    this.renderFooter = this.renderFooter.bind(this);
    this.submitView = this.submitView.bind(this);
    this.sendView = this.sendView.bind(this);
    this.getSubmitTitle = this.getSubmitTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.validator = validator({
      validation: object({
        'username': string().required('Email is required').email('Email is invalid'),
        'code': string().when('$delivery', (delivery, schema) => (delivery ? schema.required('Code is required') : schema)),
        'password': string().when('$delivery', (delivery, schema) => (delivery ? schema.required('Password is required') : schema))
      }),
      inputs: this.inputs,
      context: this.state,
      onSubmitStatus: this.setState.bind(this),
      onSubmit: this.handleSubmit.bind(this),
      onChange: this.handleInputChange.bind(this),
      onError: this.setState.bind(this)
    });
  }

  componentDidUpdate(props, prevState) {
    if (!prevState.delivery && this.state.delivery && this.state.submitting) {
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
      <button type='button' onClick={() => this.changeState('signedOut')} className={classes.link}>
        {I18n.get('Back to sign-in')}
      </button>
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
    return (
      <IconWrapper
        icon={(defaults) => <Email {...defaults}/>}
        content={() =>
          <TextField
            error={!!this.state.errors.username}
            helperText={this.state.errors.username || ''}
            label={I18n.get('Email')}
            name="username"
            onBlur={this.validator.blur}
            onChange={this.validator.change}
            margin="dense"
            fullWidth />
        }/>
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
          error={!!this.state.errors.code}
          helperText={this.state.errors.code || ''}
          label={I18n.get('Code')}
          name="code"
          onBlur={this.validator.blur}
          onChange={this.validator.change}
          margin="dense"
          fullWidth />

        <TextField
          error={!!this.state.errors.password}
          helperText={this.state.errors.password || ''}
          label={I18n.get('New password')}
          type="password"
          name="password"
          onBlur={this.validator.blur}
          onChange={this.validator.change}
          margin="dense"
          fullWidth />

      </React.Fragment>
    )
  }

  handleSubmit(e) {
    return this.state.delivery ? this.submit() : this.send();
  }

  showComponent() {
    return (
      <Layout title={I18n.get('Reset password')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.validator.submit}>
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