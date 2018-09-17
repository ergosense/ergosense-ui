import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'aws-amplify';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaperHeading from './../../../components/helper/paper-heading';

const styles = theme => ({
  root: {
  }
});

const SelectedSensor = ({ classes }) => {
  return (
    <React.Fragment>
      <Paper className={ classes.root }>
        <PaperHeading primary='HVC-12345' secondary='Pebble' />
      </Paper>
    </React.Fragment>
  );
}

SelectedSensor.propTypes = {
}


export default withStyles(styles)(SelectedSensor);
