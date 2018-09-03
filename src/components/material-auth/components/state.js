import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { I18n, JS } from '@aws-amplify/core';
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
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: 12,
    marginTop: 30,
    display: 'inline-block'
  }
});

class State extends Component
{
  constructor(props) {
    super(props);
    this.valid = this.valid.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  valid(state) {
    return false;
  }

  renderComponent() {
    return null;
  }

  render() {
    const { event, classes } = this.props;

    if (!this.valid(event)) return null;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">Sign in</Typography>
            {this.renderComponent()}
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(State);