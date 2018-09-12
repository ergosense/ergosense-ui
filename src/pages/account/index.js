import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import MainLayout from './../../layouts/main';
import SectionGeneral from './section-general';

const styles = theme => ({});

class Account extends Component {
  render() {
    return (
      <MainLayout name={I18n.get('Account')}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <SectionGeneral/>
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
