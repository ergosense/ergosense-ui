import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, ListItem, ListItemText } from '@material-ui/core';

const styles = theme => ({
  gutters: {
    paddingLeft: 18,
    paddingRight: 18
  },
  listItem: {
    borderRight: '1px solid #dedede' // TODO Use color schemes
  },
  secondaryActionContainer: {
    minWidth: 70,
    maxWidth: 70
  },
  secondaryAction: {
    paddingLeft: 10
  }
});

const ConfigItem = (props) => {
  const { classes, actions, primary, secondary } = props;
  return (
    <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={!props.last}>
      <Grid container spacing={0}>
        <Grid item xs className={ classes.listItem }>
          <ListItemText primary={primary} secondary={secondary}/>
        </Grid>
        {/*
          We are using a custom grid here because the
          default secondary list action component is a floating
          element which causes display issues with more
          complex children
        */}
        {actions &&
          <Grid item xs={2} className={ classes.secondaryActionContainer }>
            <div className={ classes.secondaryAction }>
              {actions()}
            </div>
          </Grid>}
      </Grid>
    </ListItem>
  );
};

export default withStyles(styles)(ConfigItem);
