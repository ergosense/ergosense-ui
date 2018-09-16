import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, List, ListItem, ListItemText, Button, Typography, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaperHeading from './../../components/helper/paper-heading';

const styles = theme => ({
});

const SensorList = ({ classes }) => {
  return (
    <React.Fragment>
      <Paper>
        <PaperHeading primary='Sensor List' />
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(styles)(SensorList);
