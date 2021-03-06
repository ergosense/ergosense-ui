import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n } from 'aws-amplify';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainLayout from './../../layouts/main';
import Card from './card';

import { workspaces } from './../../actions/';

const styles = theme => ({
});

class Workspaces extends Component {
  componentDidMount() {
    this.props.dispatch(workspaces.get());
  }

  manage(row) {
    const { history } = this.props;
    history.push('/workspaces/' + row.id);
  }

  render() {
    const { classes, data } = this.props;
    return (
      <MainLayout name={I18n.get('Workspaces')}>
        <Grid container spacing={24}>
          {data && data.data().map(i => {
            return (
              <Grid item xs={4} key={`card-${i.id}`}>
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

const mapStateToProps = (state) => {
  return { ...state.workspaces }
};

export default connect(mapStateToProps)(withStyles(styles)(Workspaces));