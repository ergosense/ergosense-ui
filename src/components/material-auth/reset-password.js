import React from 'react';
import { connect } from 'react-redux';
import { I18n, JS } from '@aws-amplify/core';
import { SignIn as AmplifySignIn} from 'aws-amplify-react';
import { InputAdornment, Typography, CssBaseline, Paper, TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { STEP_LOGGED_OUT, STEP_RESET, createAction, login } from './actions';
import Form from './../form';
import { Lock, Email } from '@material-ui/icons';
import IconTextField from './components/icon-text-field';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

class ResetPassword extends Form
{
  handleSubmit(e) {
    super.handleSubmit(e);
  }

  render() {
    if (this.props.step !== STEP_RESET) return null;

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">Reset</Typography>
            <form onSubmit={this.handleSubmit}>
              <IconTextField
                icon={<Email color='action' style={{ fontSize: 20 }}/>}
                error={false}
                helperText={''}
                label="Email"
                name="email"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.email || ''}
                margin="normal"
                fullWidth
                />

              <IconTextField
                icon={<Lock color='action' style={{ fontSize: 20 }}/>}
                error={false}
                helperText={false}
                type="password"
                label="Password"
                name="password"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={this.state.password || ''}
                margin="normal"
                fullWidth
                />

              <br/><br/>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={this.isSubmitting()}
                fullWidth>
                Sign in
              </Button>

              <a href="#" onclick={this.forgotPassword}>
                Forgot your password?
              </a>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(ResetPassword));