import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, CssBaseline, Typography } from '@material-ui/core';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    textAlign: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontSize: 12,
    marginTop: 30,
    display: 'inline-block',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer'
  },
  heading: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Layout extends Component
{
  render() {
    const { classes, title, footer } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline" className={classes.heading}>{title}</Typography>
            {this.props.children}
            { footer ? footer(this.props) : null }
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout);