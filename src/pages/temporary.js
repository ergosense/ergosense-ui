import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import MainLayout from './../layouts/main';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

class Temporary extends Component {
  signOut() {
    Auth.signOut()
      .then(() => { window.location.reload(); })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;

    return (
      <MainLayout>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant='headline' gutterBottom>User Details</Typography>
            <div>
              <code>
                {this.props.authData
                  && Object.keys(this.props.authData).join(', ')
                }
              </code>
            </div>
            <br/>
            <Button
              type='button'
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.signOut}>
              Logout
            </Button>
          </Paper>
        </main>
      </MainLayout>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(withStyles(styles)(Temporary));
