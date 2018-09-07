/*
 | Error Handler
 | -------------
 | This component will respond to any "error"
 | key produced by the redux reducers. We will use
 | this to display a global error message accross the application.
 | It should be used to capture unhandled exceptions or backend failures
 | that don't have specific client side responses.
 */
import React, { Component } from 'react';
import { Logger } from 'aws-amplify';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close, Error as ErrorIcon } from '@material-ui/icons';

// Local logger instance
const logger = new Logger('error-handler');

// Reason events for dismissing error messages
const EVENT_CLICKAWAY = 'clickaway';

class ErrorHandler extends Component
{
  constructor(props) {
    super(props);
    this.state = { ...this.state, open: false };
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * If a new error occurs and the component is not currently
   * open already, ensure that the component will render
   */
  componentDidUpdate(props, prevState) {
    if (this.props.error !== props.error && this.props.error && !this.state.open) {
      logger.error('application error', this.props.error);
      this.setState({ open: true });
    }
  }

  handleClose(event, reason) {
    if (reason === EVENT_CLICKAWAY) return;
    logger.debug('dismiss application error', reason);
    this.setState({ open: false });
  }

  render() {
    const { error, classes, timeout } = this.props;

    const actions = [
      <IconButton key="close" color="inherit" className={classes.close} onClick={this.handleClose}><Close /></IconButton>
    ];

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.state.open}
        autoHideDuration={timeout || null}
        onClose={this.handleClose}>
        <SnackbarContent
          className={classes.error}
          message={<span className={classes.message}><ErrorIcon className={classes.icon} />{error}</span>}
          action={actions}/>
      </Snackbar>
    );
  }
}

// Style overrides
const component = withStyles((theme) => ({
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
}))(ErrorHandler);

// Redux mapping
const mapStateToProps = (state) => {
  return { ...state.error }
};

export default connect(mapStateToProps)(component);