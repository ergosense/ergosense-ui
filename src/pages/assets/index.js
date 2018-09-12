import React from 'react';
import { I18n } from 'aws-amplify';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import MainLayout from './../../layouts/main';

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

const Assets = (props) => {
  const { classes } = props;

  return (
    <MainLayout name={I18n.get('Assets')}>
    </MainLayout>
  );
};

export default withStyles(styles)(Assets);
