import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, List } from '@material-ui/core';

import ConfigTitle from './../helper/config-title';
import ItemMFAToggle from './item-mfa-toggle';

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
  state = {
    open: {},
    MFAEnabled: false,
    MFAsubmitting: false,
    initialized: false
  };

  constructor(props) {
    super(props);

    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    this.props.dispatch({ type: ACTION_CHANGE_PASSWORD, error: err.message });
  }

  render() {
    const { classes, authData } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <List>
            <ConfigTitle title='MFA Settings' />

            <ItemMFAToggle
              user={authData}
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

export default connect(mapStateToProps)(withStyles(styles)(Security));
