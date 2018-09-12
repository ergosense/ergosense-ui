import React from 'react';
import { I18n } from 'aws-amplify';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const Insights = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Paper className={ classes.paper }>
        <Typography variant="subheading" gutterBottom>Temperature</Typography>
        <Typography variant="display1">28ºC</Typography>
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(Insights);
