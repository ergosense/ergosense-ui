import React from 'react';
import { I18n } from 'aws-amplify';
import { connect } from 'react-redux';
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import { Dashboard, LocationCity, Settings } from '@material-ui/icons'
import grey from '@material-ui/core/colors/grey';

const EMPTY_CHAR = '-';

const styles = (theme) => ({
  drawerPaper: {
    position: 'fixed',
    width: 240,
    height: '100%'
  },
  toolbar: theme.mixins.toolbar,
  active: {
    color: '#ffffff'
  },
  icon: {
    color: grey[800]
  }
});

const isActive = (location, match) => {
  return location.pathname === match;
}

const SideBar = (props) => {
  const { classes, location } = props;
  console.log(props);

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
            <ListItemText primary={I18n.get('Signed in as')} secondary={(props.authData.attributes && props.authData.attributes.email) || EMPTY_CHAR} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" selected={isActive(location, "/")}>
            <Dashboard className={ classes.icon }/>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/site" selected={isActive(location, "/site")}>
            <LocationCity className={ classes.icon }/>
            <ListItemText primary="Site management" />
          </ListItem>
          <ListItem button component={Link} to="/account" selected={isActive(location, "/account")}>
            <Settings className={ classes.icon }/>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return { ...state.login, ...state.router }
};

export default  connect(mapStateToProps)(withStyles(styles)(SideBar));