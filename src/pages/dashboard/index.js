import React from 'react';
import { I18n } from 'aws-amplify';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import MainLayout from './../../layouts/main';
import Graph from './graph';
import Gauges from './gauges';

const styles = theme => ({
  subheading: {
    color: grey[500]
  },
  gutterBottom: {
    marginBottom: 10
  },
  display1: {
    color: grey[400]
  }
});

const Dashboard = (props) => {
  const { classes } = props;

  return (
    <MainLayout name={I18n.get('Dashboard')}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom classes={{ subheading: classes.subheading, gutterBottom: classes.gutterBottom }}>
            Environment Overview
          </Typography>
          <Gauges/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom classes={{ subheading: classes.subheading, gutterBottom: classes.gutterBottom }}>
            Sensor Data
          </Typography>
          <Graph/>
        </Grid>
        {/*
        <Grid item xs={4}>
          <Typography variant="subheading" gutterBottom classes={{ subheading: classes.subheading, gutterBottom: classes.gutterBottom }}>
            Insights
          </Typography>
          <Insights/>
        </Grid>
        */}
      </Grid>
    </MainLayout>
  );
};

export default withStyles(styles)(Dashboard);
