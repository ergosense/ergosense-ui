import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

import MainLayout from './../../../layouts/main';
import FloorList from './floor-list';
import FloorEditor from './floor-editor';
import SelectedSensor from './selected-sensor';

const styles = theme => ({
  editor: {
    position: 'relative',
    width: 'calc(100% + ' + (theme.spacing.unit * 8) + 'px)',
    height: 'calc(100% + ' + (theme.spacing.unit * 8) + 'px)',
    margin: (theme.spacing.unit * 4) * -1,
    backgroundColor: '#ffffff'
  },
  floorList: {
    position: 'absolute',
    top: theme.spacing.unit * 4,
    left: theme.spacing.unit * 4
  },
  sensorList: {
    position: 'absolute',
    left: theme.spacing.unit * 4,
    top: (theme.spacing.unit * 4 * 2) + 64
  },
  selectedSensor: {
    position: 'absolute',
    top: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

class WorkspaceEditor extends Component {
  card = 0;

  state = {
    floor: ''
  }

  manage(row) {
    console.log(row);
  }

  floorChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, match } = this.props;

    const keys = { ID: 'id', Name: 'name', Address: 'address' }

    const items = [
      { id: 1, name: 'Floor A', children: [{ id: 2, name: 'Office 1' }] }
    ];

    return (
      <MainLayout name={I18n.get('Workspace Editor')}>
        <div className={ classes.editor }>
          <FloorEditor
            zoom={this.state.zoom}/>

          <FloorList
            value={this.state.floor}
            items={[{ id: 1, value: 'Floor A' }]}
            onChange={this.floorChange.bind(this)}
            classes={{ root: classes.floorList }} />

          <SelectedSensor
            classes={{ root: classes.selectedSensor }}/>

          <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            className={classes.fab}>
            <Add />
          </Button>
        </div>
      </MainLayout>
    );
  }
};

export default withStyles(styles)(WorkspaceEditor);
