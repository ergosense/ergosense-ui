import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  iconTextField: {
    position: 'relative',
    paddingLeft: theme.spacing.unit * 4
  },
  iconTextFieldIcon: {
    position: 'absolute',
    left: 0,
    bottom: 10
  }
});

class IconTextField extends Component
{
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.iconTextField}>
          <div className={classes.iconTextFieldIcon}>
            {this.props.icon}
          </div>
          <TextField {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}

IconTextField.propTypes = {
  icon: PropTypes.element.isRequired
};

export default withStyles(styles)(IconTextField);