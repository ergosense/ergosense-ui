import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
});

class LoadingButton extends Component {
  render() {
    const { submitting, classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            { ...this.props }
            classes={{}}
            submitting={{}}
            disabled={submitting}>
            {this.props.children}
          </Button>

          {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </React.Fragment>
    );
  }
}

LoadingButton.propTypes = {
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoadingButton);