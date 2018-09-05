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
  },
  sentCode: {
    color: theme.palette.secondary.main
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
    const { classes } = this.props;
    const user = this.props.authData;
    const { unverified } = user;

    return (
      <React.Fragment>
        <Typography align='left'>
          Enter the code sent to <font className={classes.sentCode}>{unverified[this.state.verifyAttr]}</font>
        </Typography>

        <TextField
          error={false}
          helperText={false}
          label={I18n.get('Code')}
          name="code"
          onChange={this.handleInputChange}
          margin="normal"
          fullWidth />
      </React.Fragment>
    );
  }

  /**
   * Because we use Material-UI, the components will rely on the state redrawing
   * the underlying DOM. The components used by Amplify do not work in this way. To
   * work around this, we will also keep the "input" values in the component state.
   */
  handleInputChange(evt) {
    super.handleInputChange(evt);

    // Use state variables to trigger a redraw
    this.setState({ [evt.target.name]: this.inputs.checkedValue });
  }

  verifyView() {
    const user = this.props.authData;
    const { classes } = this.props;
    const { unverified } = user;
    const { email, phone_number } = unverified;

    // TODO better message
    if (!unverified) return <Typography>User has been fully verified...</Typography>;

    // Set the default value. Since the underlying
    // component doesn't use the component state, we have to hack
    // around that problem.
    this.inputs.checkedValue = this.inputs.checkedValue || (email ? 'email' : 'phone_number');

    // Ensure contact always selected, so form submit works as expected.
    this.inputs.contact = true;

    return (
      <React.Fragment>
        <Typography align='left'>
          Please select the address you want to use for verification
        </Typography>
        { unverified &&
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup name="contact" value={this.inputs.checkedValue} onChange={this.handleInputChange}>
                { email && <FormControlLabel value="email" control={<Radio/>} label={email} /> }
                { phone_number && <FormControlLabel value="phone_number" control={<Radio/>} label={phone_number} /> }
              </RadioGroup>
            </FormControl>
        }
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
    return this.state.verifyAttr ? this.submit() : this.verify();
  }

  showComponent() {
    const user = this.props.authData;
    const { unverified } = user;

    return (
      <Layout title={I18n.get('Verify account information')} footer={props => this.renderFooter(props)}>
        <form onSubmit={this.handleSubmit}>
          { this.state.verifyAttr ? this.submitView() : this.verifyView() }

          <br/><br/>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.submitting || !unverified}
            fullWidth>
            { this.getSubmitTitle() }
          </Button>
        </form>
      </Layout>
    );
  }
}

export default withStyles(styles)(VerifyContact);