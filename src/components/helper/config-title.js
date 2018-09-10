import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, ListItem } from '@material-ui/core';

const styles = theme => ({
  gutters: {
    paddingLeft: 18,
    paddingRight: 18,
    position: 'relative'
  },
  heading: {
    paddingLeft: 30,
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 18
  }
});

const ConfigTitle = (props) => {
  const { classes, title, icon } = props;
  return (
    <ListItem classes={{ gutters: classes.gutters }} dense={true} divider={true}>
      <Typography variant='subheading' gutterBottom className={ classes.heading }>
        {icon && <div className={ classes.icon }>{icon()}</div>} {title}
      </Typography>
    </ListItem>
  );
};

export default withStyles(styles)(ConfigTitle);
