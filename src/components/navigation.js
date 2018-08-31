import React from 'react';
import { Button, Typography, AppBar, Toolbar, IconButton, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

const Navigation = (props) => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar disableGutters={false} className={classes.toolbar}>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Dashboard
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Navigation);