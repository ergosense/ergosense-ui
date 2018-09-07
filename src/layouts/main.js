import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TopBar from './../components/top-bar'
import SideBar from './../components/side-bar'

const styles = theme => ({
  contentwrap: {
    margin: 0,
    width: '100%',
    paddingLeft: 240
  },
  main: {
    width: '100%',
    padding: theme.spacing.unit * 4
  }
});

const MainLayout = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <SideBar/>
      <Grid item container spacing={40} className={classes.contentwrap} xs>
        <TopBar />
        <main className={classes.main}>
          {props.children}
        </main>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(MainLayout);
