import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
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

const Gauges = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Temperature</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }}>28ºC</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Noise levels</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} style={{ color: orange[200] }}>50dB</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Light levels</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} style={{ color: red[200] }}>28lx</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Temperature</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} style={{ color: red[200] }}>28ºC</Typography>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Gauges);
