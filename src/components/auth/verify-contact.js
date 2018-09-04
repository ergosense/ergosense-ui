import React from 'react';
import { Auth } from 'aws-amplify';
import { I18n } from '@aws-amplify/core';
import { VerifyContact as BaseVerifyContact } from 'aws-amplify-react';
import { Lock, Email } from '@material-ui/icons';
import { FormControl, RadioGroup, Radio, FormControlLabel, Typography, TextField, Button } from '@material-ui/core';
import Layout from './../material-auth/layout';
import IconTextField from './../material-auth/components/icon-text-field';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  formControl: {
    textAlign: 'left',
    display: 'block'
  }
});

class VerifyContact extends BaseVerifyContact {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false }

    this.submitView = this.submitView.bind(this);
    this.verifyView = this.verifyView.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.getSubmitTitle = this.getSubmitTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSubmitTitle() {
    return this.state.verifyAttr ? 'Verify' : 'Submit';
  }

  submitView() {
    return (
      <TextField
        error={false}
        helperText={false}
        label={I18n.get('Code')}
        name="code"
        onChange={this.handleInputChange}
        margin="normal"
        fullWidth />
    );
  }

  verifyView() {
    const user = this.props.authData;
    const { classes } = this.props;
    const { unverified } = user;
    const { email, phone_number } = unverified;
    const value = this.inputs.contact || (email && 'email') || (phone_number && 'phone_number');

    return (
      <React.Fragment>
        <Typography align='left'>
          Please select the address you want to use for verification
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup name="contact" value={value} onChange={this.handleInputChange}>
            { email && <FormControlLabel value="email" control={<Radio />} label={email} /> }
            { phone_number && <FormControlLabel value="phone_number" control={<Radio />} label={phone_number} /> }
          </RadioGroup>
        </FormControl>
      </React.Fragment>
    );
  }

  renderFooter(layoutProps) {
    const { classes } = layoutProps;
    const { authData } = this.props;

    return (
      <a href="#" onClick={() => this.changeState('signedIn', authData)} className={classes.link}>
        {I18n.get('Skip verification')}
      </a>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.verifyAttr) {
      this.submit();
    } else {
      this.verify();
    }
  }

  showComponent() {
    return (
      <Layout title={I18n.get('Verify account information')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.handleSubmit}>
          { this.state.verifyAttr ? this.submitView() : this.verifyView() }

          <br/>

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

export default withStyles(styles)(VerifyContact);