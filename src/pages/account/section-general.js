import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { List } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import ConfigTitle from './../../components/helper/config-title';
import ItemMFAToggle from './item-mfa-toggle';
import ItemPasswordChange from './item-password-change';
import ItemEmail from './item-email';

export const ACTION_CHANGE_PASSWORD = 'action-change-password';

const styles = theme => ({
  paper: {
    width: '100%'
  },
  subheading: {
    color: grey[500]
  },
  gutterBottom: {
    marginBottom: 10
  }
});

class SectionGeneral extends Component {
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
        <Typography variant="subheading" gutterBottom classes={{ subheading: classes.subheading, gutterBottom: classes.gutterBottom }}>
          General
        </Typography>
        <Paper className={classes.paper}>
          <List>
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

export default connect(mapStateToProps)(withStyles(styles)(SectionGeneral));
