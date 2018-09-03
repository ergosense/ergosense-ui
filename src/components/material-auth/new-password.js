import React from 'react';
import { connect } from 'react-redux';
import { I18n, JS } from '@aws-amplify/core';
import { InputAdornment, Typography, CssBaseline, Paper, TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { STEP_NEW_PASSWORD, newPassword } from './actions';
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

class NewPassword extends Form
{
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    super.handleSubmit(e);

    const { password } = this.state;
    const { user } = this.props;
    const { requiredAttributes } = user.challengeParam;

    newPassword(user, password, requiredAttributes, this.props.dispatch)
      .then(user => this.release());
  }

  render() {
    return null;

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">New password</Typography>
            <form onSubmit={this.handleSubmit}>
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
                Change
              </Button>
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

export default connect(mapStateToProps)(withStyles(styles)(NewPassword));