import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import { Paper, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';

const styles = theme => ({
  root: {
    // noop
  },
  formControl: {
    padding: theme.spacing.unit * 2
  },
  select: {
    // noop
  },
  selectEmpty: {
    color: theme.palette.text.secondary
  }
});

const FloorList = ({ value, items, name, placeholder, classes, onChange }) => {
  return (
    <React.Fragment>
      <Paper className={ classes.root }>
        <FormControl className={classes.formControl}>
          <Select
            value={value}
            name='floor'
            displayEmpty
            onChange={onChange}
            className={value == '' ? classes.selectEmpty : classes.select}
            fullWidth>
            <MenuItem value="" disabled>Select the floor to view/edit</MenuItem>
            {items.map(i => {
              return (
                <MenuItem value={i.id} key={`id-${i.id}`}>{i.value}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Paper>
    </React.Fragment>
  );
}

FloorList.propTypes = {
  value: PropTypes.any.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default withStyles(styles)(FloorList);
