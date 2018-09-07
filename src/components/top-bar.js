import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
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

class Navigation extends Component {
  logout() {
    Auth.signOut()
      .then(() => { window.location.reload(); })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar disableGutters={false} className={classes.toolbar}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={this.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navigation);