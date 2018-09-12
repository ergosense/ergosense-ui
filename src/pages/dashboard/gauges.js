import React from 'react';
import { Grid, Paper, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccessTime } from '@material-ui/icons';

import lightGreen from '@material-ui/core/colors/lightGreen';
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
  },
  temp: {
    backgroundColor: lightGreen[600]
  },
  smallIcon: {
    fontSize: 16,
    marginBottom: "-3px"
  },
  caption: {
    marginTop: 12
  },
});

const Gauges = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom align='left'>Temperature</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} align='left' gutterBottom>28ºC</Typography>
            <Divider/>
            <Typography variant="caption" align="left" className={ classes.caption }>
              <AccessTime className={ classes.smallIcon }/> updated 4 minutes ago
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Noise levels</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} style={{ color: orange[200] }} gutterBottom>50dB</Typography>
            <Divider/>
            <Typography variant="caption" align="left" className={ classes.caption }>
              <AccessTime className={ classes.smallIcon }/> updated 4 minutes ago
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Light levels</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} style={{ color: red[200] }} gutterBottom>28lx</Typography>
            <Divider/>
            <Typography variant="caption" align="left" className={ classes.caption }>
              <AccessTime className={ classes.smallIcon }/> updated 4 minutes ago
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.reading}>
          <Paper className={ classes.paper }>
            <Typography variant="subheading" gutterBottom>Assets in flux</Typography>
            <Typography variant="display1" classes={{ display1: classes.display1 }} style={{ color: red[200] }} gutterBottom>50%</Typography>
            <Divider/>
            <Typography variant="caption" align="left" className={ classes.caption }>
              <AccessTime className={ classes.smallIcon }/> updated 4 minutes ago
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Gauges);
