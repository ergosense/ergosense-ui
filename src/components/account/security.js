import React, { Component } from 'react';
import { Auth, I18n } from 'aws-amplify';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { InputLabel, InputAdornment, Input, Switch } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { validator, LoadingButton } from './../auth';
import { object, string } from 'yup';
import ChangePassword from './change-password';

export const ACTION_CHANGE_PASSWORD = 'action-change-password';

const styles = theme => ({
  paper: {
    width: '100%'
  },
  gutters: {
    paddingLeft: 18,
    paddingRight: 18
  },
  secondaryAction: {
    right: 18,
    borderLeft: '1px solid #dedede', // TODO use color schemes
    paddingLeft: 10
  }
});

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleError(err) {
    this.props.dispatch({ type: ACTION_CHANGE_PASSWORD, error: err.message });
  }

  render() {
    const { classes } = this.props;
    const { editNumber, number } = this.state;
    console.log(this.props);

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <List>
            <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={true}>
              <Typography variant='title' gutterBottom>
                Security
              </Typography>
            </ListItem>
            <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={true}>
              <ListItemText
                primary="Account password"
                secondary="***********"/>
              <ListItemSecondaryAction className={ classes.secondaryAction }>
                <Button size="small" onClick={this.handleOpen}>
                  Change
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={true}>
              <ListItemText
                primary="Use SMS for MFA"
                secondary="What is MFA, perhaps provide a link to go somewhere"/>
              <ListItemSecondaryAction>
                <Switch checked={true}/>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem classes={{ gutters: classes.gutters }} dense={true}>
              <ListItemText
                primary="Use a software authenticator for MFA"
                secondary="What is MFA, perhaps provide a link to go somewhere"/>
              <ListItemSecondaryAction>
                <Switch checked={true}/>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <ChangePassword
          user={this.props.authData}
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          onSuccess={() => true}
          onError={this.handleError}/>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(Security));
