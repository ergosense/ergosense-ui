import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
});

class ErrorHandler extends Component
{
  render() {
    const { error } = this.props;
    console.log('ERROR!');
    console.log(error);
    return (null);
  }
}

const mapStateToProps = (state) => {
  return { ...state.error }
};

export default connect(mapStateToProps)(withStyles(styles)(ErrorHandler));