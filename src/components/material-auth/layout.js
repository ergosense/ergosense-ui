import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Form from './../form'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
});

class Layout extends Component
{
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} className="logo">
            Ergosense Logo
        </Grid>
        <Grid item xs={12} className="form">
          <Paper className={classes.root}>
            {this.props.children}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Layout);