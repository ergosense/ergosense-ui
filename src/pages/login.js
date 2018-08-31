import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './login.css'
import LoginForm from './../components/login-form';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const LoginPage = (props) => {
  const { classes } = props;

  return (
    <Grid container>
      <Grid item xs={12} className="logo">
          Ergosense Logo
      </Grid>
      <Grid item xs={12} className="form">
        <Paper className={classes.root}>
          <LoginForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(LoginPage);
