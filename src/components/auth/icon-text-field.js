import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { yup } from 'yup';

const styles = (theme) => ({
  iconTextField: {
    position: 'relative',
    paddingLeft: theme.spacing.unit * 4
  },
  iconTextFieldIcon: {
    position: 'absolute',
    left: 0,
    top: 26
  }
});

class IconTextField extends Component
{
  constructor(props) {
    super(props);
    this.state = { ...this.state, error: false };
  }

  render() {
    const { classes, parent } = this.props;
    const parentState = parent.state;
    const errors = parentState.errors || {}

    const iconColor = !!errors[this.props.name] ? 'error' : 'action';

    return (
      <React.Fragment>
        <div className={classes.iconTextField}>
          <div className={classes.iconTextFieldIcon}>
            {React.cloneElement(this.props.icon, { color: iconColor, style: { fontSize: 20 }})}
          </div>
          <TextField
            margin="dense"
            fullWidth
            {...this.props}  />
        </div>
      </React.Fragment>
    );
  }
}

IconTextField.propTypes = {
  icon: PropTypes.element.isRequired
};

export default withStyles(styles)(IconTextField);