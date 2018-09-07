import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import { Dashboard, LocationCity, Settings } from '@material-ui/icons'

const styles = (theme) => ({
  drawerPaper: {
    position: 'fixed',
    width: 240,
    height: '100%'
  },
  toolbar: theme.mixins.toolbar
});

const SideBar = (props) => {
  const { classes } = props;
  return (
    <Drawer
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar}>
          Ergosense-Logo
        </div>
        <Divider />
        <List>
          <ListItem dense={true}>
            <ListItemText primary="Signed in as" secondary="user@gmail.com" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <Dashboard/>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/site">
            <LocationCity/>
            <ListItemText primary="Site management" />
          </ListItem>
          <ListItem button component={Link} to="/account">
            <Settings/>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
    </Drawer>
  );
}

export default withStyles(styles)(SideBar);