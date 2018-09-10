import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MainLayout from './../layouts/main';

import General from '../components/account/general';
import Security from '../components/account/security';

const styles = theme => ({});

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainLayout>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <General/>
          </Grid>
          <Grid item xs={6}>
            <Security/>
          </Grid>
        </Grid>
      </MainLayout>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(Account));
