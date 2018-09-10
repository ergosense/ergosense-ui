import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { List } from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import ChangePassword from './../dialog/change-password';
import EditPhoneNumber from './../dialog/edit-phone-number';
import ConfigTitle from './../helper/config-title';
import ConfigItem from './../helper/config-item';
import ItemMFAToggle from './item-mfa-toggle';

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

            <ConfigItem
              primary="Primary email address"
              secondary="test@gmail.com" />

            <ConfigItem
              primary="Account password"
              secondary="**********"
              actions={() =>
                <Button size="small" onClick={() => this.open('password')}>
                  Change
                </Button>
              }/>

            <ConfigItem
              last={true}
              primary="Phone number"
              secondary="+27724067515"
              actions={() =>
                <Button size="small" onClick={() => this.open('number')}>
                  Change
                </Button>
              }/>

            <ItemMFAToggle
              user={this.props.authData}
              last={true}/>
          </List>
        </Paper>

        {/* Change password dialog */}
        <ChangePassword
          user={this.props.authData}
          open={this.state.open.password || false}
          onClose={() => this.close('password')}
          onSuccess={() => true}
          onError={this.handleError}/>

        {/* Change number dialog */}
        <EditPhoneNumber
          user={this.props.authData}
          open={this.state.open.number || false}
          onClose={() => this.close('number')}
          onSuccess={() => true }
          onError={this.handleError}/>

      </React.Fragment>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(General));
