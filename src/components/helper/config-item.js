import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

const styles = theme => ({
  gutters: {
    paddingLeft: 18,
    paddingRight: 18
  },
  secondaryAction: {
    right: 18,
    borderLeft: '1px solid #dedede', // TODO use color schemes
    paddingLeft: 10
  }
});

const ConfigItem = (props) => {
  const { classes, actions, primary, secondary } = props;
  return (
    <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={!props.last}>
      <ListItemText primary={primary} secondary={secondary}/>
      {actions &&
        <ListItemSecondaryAction className={ classes.secondaryAction }>
          {actions()}
        </ListItemSecondaryAction>
      }
    </ListItem>
  );
};

export default withStyles(styles)(ConfigItem);
