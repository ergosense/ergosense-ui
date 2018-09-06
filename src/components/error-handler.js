import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton, CloseIcon } from '@material-ui/core';
import { Close, Error as ErrorIcon } from '@material-ui/icons';

const EVENT_CLICKAWAY = 'clickaway';

const styles = theme => ({
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

class ErrorHandler extends Component
{
  constructor(props) {
    super(props);
    this.state = { ...this.state, open: false };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(props, prevState) {
    if (this.props.error !== props.error && !this.state.open) {
      this.setState({ open: true });
    }
  }

  handleClose(event, reason) {
    if (reason === EVENT_CLICKAWAY) return;
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

const mapStateToProps = (state) => {
  return { ...state.error }
};

export default connect(mapStateToProps)(withStyles(styles)(ErrorHandler));