import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tree from '../../components/tree';

import MainLayout from './../../layouts/main';
import FloorList from './floor-list';
import SensorList from './sensor-list';
import FloorEditor from './floor-editor';

const styles = theme => ({
});

class WorkspaceEditor extends Component {
  card = 0;

  manage(row) {
    console.log(row);
  }

  render() {
    const { classes, match } = this.props;

    const keys = { ID: 'id', Name: 'name', Address: 'address' }

    const items = [
      { id: 1, name: 'Floor A', children: [{ id: 2, name: 'Office 1' }] }
    ];

    return (
      <MainLayout name={I18n.get('Workspace Editor')}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <FloorList gutterBottom />
            <SensorList />
          </Grid>
          <Grid item xs>
            <FloorEditor />
          </Grid>
        </Grid>
      </MainLayout>
    );
  }
};

export default withStyles(styles)(WorkspaceEditor);
