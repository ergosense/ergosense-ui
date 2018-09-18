import React, { Component } from 'react';
import { I18n } from 'aws-amplify';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from './../../layouts/main';
import Card from './card';

const styles = theme => ({
});

class Workspaces extends Component {
  card = 0;

  manage(row) {
    const { history } = this.props;
    history.push('/workspaces/' + row.id);
  }

  render() {
    const { classes } = this.props;

    const keys = { ID: 'id', Name: 'name', Address: 'address' }

    const data = [
      { 'id': 1, 'name': 'Willowbridge Place', address: '3 Deadland Street, Dead Marshes, Mordor' },
      { 'id': 2, 'name': 'Test', address: '3 Deadland Street, Dead Marshes, Mordor' }
    ];

    return (
      <MainLayout name={I18n.get('Workspaces')}>
        <Grid container spacing={24}>
          {data.map(i => {
            return (
              <Grid item xs={4} key={`card-${this.card++}`}>
                <Card
                  title={i.name}
                  content={i.address}
                  onClick={() => this.manage.bind(this)(i)}/>
              </Grid>
            );
          })}
        </Grid>
      </MainLayout>
    );
  }
};

export default withStyles(styles)(Workspaces);
