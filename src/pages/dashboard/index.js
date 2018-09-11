import React from 'react';
import { I18n } from 'aws-amplify';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from './../../layouts/main';
import Graph from './graph';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const Dashboard = (props) => {
  const { classes } = props;

  return (
    <MainLayout name={I18n.get('Dashboard')}>
      <Grid item xs={12}>
        <Typography variant='display1' gutterBottom>
          Sensor Data
        </Typography>
        <Paper className={classes.paper}>
          <Graph/>
        </Paper>
      </Grid>
    </MainLayout>
  );
};

export default withStyles(styles)(Dashboard);
