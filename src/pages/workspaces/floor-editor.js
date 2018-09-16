import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, List, ListItem, ListItemText, Button, Typography, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaperHeading from './../../components/helper/paper-heading';

const styles = theme => ({
  editor: {
    backgroundColor: '#ffffff',
    height: window.innerHeight
  }
});

const grid = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
     <defs>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)"/>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" strokeWidth="1"/>
        </pattern>
      </defs>

      <image xlinkHref="/plan1.jpg" x="0" y="0" height="100%" width="100%"/>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

const FloorEditor = ({ classes }) => {
  return (
    <React.Fragment>
      <div className={ classes.editor }>
        { grid() }
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(FloorEditor);
