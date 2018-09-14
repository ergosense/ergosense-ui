/**
 * Notifications
 * -------------
 * Displays up notifications, such as global failures or
 * success operations
 */
import React, { Component } from 'react';
import { Logger } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
//import { Close, Error as ErrorIcon } from '@material-ui/icons';

// Local logger instance
const logger = new Logger('notifications');

// Style overrides
const styles = (theme) => ({
  error: {
    marginTop: theme.spacing.unit * 2,
    backgroundColor: theme.palette.error.dark
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  icon: {
    fontSize: 18,
    marginBottom: -4,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    lineHeight: '17px'
  }
});

class Notifications extends Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    // New notification issued, open the container
    if (!prevProps.notification && this.props.notification && !this.state.open) {
      this.setState({ open: true })
    }
  }

  render() {
    const { notification, classes, dismiss, timeout } = this.props;

    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={ notification && this.state.open }
          autoHideDuration={ timeout || null }
          onClose={ () => this.setState({ open: false }) }
          onExited={ dismiss }
          message={ notification && notification.message } />
      </React.Fragment>
    )
  }
};

export default withStyles(styles)(Notifications);
