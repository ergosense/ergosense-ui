import React from 'react';
import { Grid, Paper, Typography, AppBar, Toolbar, IconButton, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Layout from './../layouts'

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const HomePage = (props) => {
  const { classes } = props;

  return (
    <Layout>
      <Grid item xs={12}>
        <Typography variant='display1'>
          Sensor Data
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Typography variant='display1'>
          Sensor Data Average
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='display1'>
          Insights
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default withStyles(styles)(HomePage);
