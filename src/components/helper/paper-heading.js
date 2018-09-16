import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2
  }
});

const PaperHeading = ({ primary, secondary, classes }) => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Typography variant="subheading">{ primary }</Typography>
        {secondary && <Typography color="textSecondary">{secondary}</Typography>}
      </div>
      <Divider />
    </React.Fragment>
  );
};

PaperHeading.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string
};

export default withStyles(styles)(PaperHeading);