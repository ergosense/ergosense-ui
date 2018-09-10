import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, ListItem } from '@material-ui/core';

const styles = theme => ({
  gutters: {
    paddingLeft: 18,
    paddingRight: 18
  },
  icon: {
    fontSize:18,
    marginTop: 5
  }
});

const ConfigTitle = (props) => {
  const { classes, title, icon } = props;
  return (
    <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={true}>
      <Typography variant='subheading' gutterBottom>
        {icon && <span classes={ classes.icon }>{icon()}</span>} {title}
      </Typography>
    </ListItem>
  );
};

export default withStyles(styles)(ConfigTitle);
