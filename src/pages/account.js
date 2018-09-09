import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Edit, VerifiedUser, Visibility, VisibilityOff } from '@material-ui/icons';
import { Paper, Typography, Grid, IconButton, Button, TextField } from '@material-ui/core';
import { FormControl, FormLabel, FormHelperText, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { List, ListItem, ListItemText, Divider, ListItemSecondaryAction, Switch } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import MainLayout from './../layouts/main';
import { InputLabel, InputAdornment, Input } from '@material-ui/core';

import Security from '../components/account/security';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary,
    fontSize: 12 // TODO find variable for this
  },
  paper: {
    width: '100%'
  },
  verifiedIcon: {
    fontSize: 'inherit',
    marginBottom: '-2px'
  },
  verified: {
    color: green[400]
  },
  gutters: {
    paddingLeft: 18,
    paddingRight: 18
  },
  alignRight: {
    textAlign: 'right',
    display: 'block',
    paddingBottom: 8
  },
  secondaryAction: {
    right: 18
  }
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      number: false,
      editNumber: false
    };

    this.editNumber = this.editNumber.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  saveChange() {
    this.setState({ editNumber: false });
  }

  handleChange(e) {
    console.log('what');
    this.setState({ [e.target.name]: e.target.value });
  }

  editNumber() {
    this.setState({ editNumber: true });
  }

  renderEmail() {
    const { classes } = this.props;

    return (
      <span className={classes.verified}>
        <VerifiedUser className={classes.verifiedIcon}/> test@gmail.com
      </span>
    );
  }

  handleClickShowPassword() {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  renderPhoneNumber() {
    const { classes } = this.props;

    return (
      <span>
        {this.state.number}
      </span>
    );
  }

  render() {
    const { classes } = this.props;
    const { editNumber, number } = this.state;

    return (
      <MainLayout>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Security/>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <Typography variant='title' gutterBottom>
                    User Information
                  </Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemText
                      primary="Email"
                      secondary={this.renderEmail()}
                    />
                </ListItem>
                <Divider/>
                <ListItem>
                  {!editNumber &&
                    <React.Fragment>
                      <ListItemText
                          primary="Phone Number"
                          secondary={this.renderPhoneNumber()}
                        />
                    </React.Fragment>
                  }
                  {editNumber &&
                    <TextField
                      name='number'
                      fullWidth
                      value={this.state.number}
                      onChange={this.handleChange}
                      onBlur={this.saveChange}
                      />
                  }
                </ListItem>
              </List>
            </Paper>
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
