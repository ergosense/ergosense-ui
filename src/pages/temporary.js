import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Button } from '@material-ui/core';

const Temporary = (props) => {
  return (
    <Paper>
      <Typography>User Details</Typography>
      <code>
        {JSON.stringify(props.user)}
      </code>
      <Button type='button'>
        Logout
      </Button>
    </Paper>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(Temporary);
