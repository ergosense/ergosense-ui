import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, List, ListItem, ListItemText, Button, Typography, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaperHeading from './../../components/helper/paper-heading';

const styles = theme => ({
  list: {
    padding: 0
  },
  listItemText: {
    padding: 0
  },
  radio: {
    height: 32
  },
  gutters: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  button: {
    padding: theme.spacing.unit * 2
  },
  gutterBottom: {
    marginBottom: theme.spacing.unit * 4
  }
});

const FloorList = ({ gutterBottom, classes }) => {
  return (
    <React.Fragment>
      <Paper className={gutterBottom ? classes.gutterBottom : false }>
        <PaperHeading primary='Floor List' secondary='Select the floor to explore' />
        <List className={ classes.list }>
          <ListItem button divider={true} dense classes={{ gutters: classes.gutters }}>
            <Radio checked={true} tabIndex={-1} disableRipple classes={{ root: classes.radio }}/>
            <ListItemText primary='Floor A'  classes={{ root: classes.listItemText }}/>
          </ListItem>
          <ListItem button divider={true} dense classes={{ gutters: classes.gutters }}>
            <Radio checked={true} tabIndex={-1} disableRipple classes={{ root: classes.radio }}/>
            <ListItemText primary='Floor B'  classes={{ root: classes.listItemText }}/>
          </ListItem>
        </List>
        <div className={classes.button}>
          <Button variant="contained" color="primary" fullWidth>Add</Button>
        </div>
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(styles)(FloorList);
