import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Navigation from './../components/navigation'
import SideBar from './../components/sidebar'

const styles = theme => ({
  contentwrap: {
    margin: 0,
    width: '100%',
    paddingLeft: 240
  },
});

const Layout = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <SideBar/>
      <Grid item container spacing={40} className={classes.contentwrap} xs>
        <Navigation />
        {props.children}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Layout);
