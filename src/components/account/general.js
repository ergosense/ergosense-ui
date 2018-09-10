import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { List } from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import ChangePassword from './../dialog/change-password';
import ConfigTitle from './../helper/config-title';
import ConfigItem from './../helper/config-item';
import ItemMFAToggle from './item-mfa-toggle';
import ItemPasswordChange from './item-password-change';
import ItemEmail from './item-email';

export const ACTION_CHANGE_PASSWORD = 'action-change-password';

const styles = theme => ({
  paper: {
    width: '100%'
  }
});

class General extends Component {
  constructor(props) {
    super(props);
    this.state = { open: {} };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  open(target) {
    this.setState({ open: { ...this.state.open, [target]: true } });
  }

  close(target) {
    this.setState({ open: { ...this.state.open, [target]: false } });
  }

  handleError(err) {
    this.props.dispatch({ type: ACTION_CHANGE_PASSWORD, error: err.message });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <List>
            <ConfigTitle
              icon={() => <SupervisorAccount/>}
              title="General" />

            <ItemEmail
              user={this.props.authData}/>

            <ItemPasswordChange
              user={this.props.authData}/>

            <ItemMFAToggle
              user={this.props.authData}
              last={true}/>
          </List>
        </Paper>


      </React.Fragment>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(General));
