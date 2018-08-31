import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import DashboardIcon from '@material-ui/icons/Dashboard'
import LocationCityIcon from '@material-ui/icons/LocationCity'

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
          <ListItem button component={Link} to="/">
            <DashboardIcon/>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/site">
            <LocationCityIcon/>
            <ListItemText primary="Site management" />
          </ListItem>
        </List>
        <Divider />
        <List></List>
    </Drawer>
  );
}

export default withStyles(styles)(SideBar);