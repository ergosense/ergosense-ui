import React from 'react';
import { I18n } from 'aws-amplify';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from './../../layouts/main';
import Graph from './graph';

import Gauge from './../../components/charts/gauge';

const styles = theme => ({
});

const Dashboard = (props) => {
  const { classes } = props;

  return (
    <MainLayout name={I18n.get('Dashboard')}>
      <Grid item xs={12}>
        <Gauge value={80} name='Temp.' color='#123456'/>
      </Grid>
      <Grid item xs={12}>
        <Graph/>
      </Grid>
    </MainLayout>
  );
};

export default withStyles(styles)(Dashboard);
