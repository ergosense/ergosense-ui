import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  subheading: {
    color: grey[500]
  },
  gutterBottom: {
    marginBottom: theme.spacing.unit * 2
  }
});

const SubHeading = ({ title, classes }) => {
  return (
    <Typography
      variant="subheading"
      gutterBottom
      classes={{
        subheading: classes.subheading,
        gutterBottom: classes.gutterBottom,
        ...classes
      }}>
      { title }
    </Typography>
  );
};

SubHeading.propTypes = {
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(SubHeading);