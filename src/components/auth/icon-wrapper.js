import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

const IconWrapper = (props) => {
  return (
    <div className={props.classes.iconTextField}>
      <div className={props.classes.iconTextFieldIcon}>
        {props.icon({ color: (props.error ? 'error' : 'action'), style: { fontSize: 20 } })}
      </div>
      {props.content({ error: props.error, margin: "dense", fullWidth: true })}
    </div>
  );
};

IconWrapper.propTypes = {
  icon: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
  error: PropTypes.bool
};

export default withStyles(styles)(IconWrapper);