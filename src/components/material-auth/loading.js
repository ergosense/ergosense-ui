import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { login, logout } from './actions';
import { State } from './';

export default class Loading extends Component
{
  componentDidMount() {
    this.checkUser();
  }

  checkUser() {
    const that = this;

    return Auth.currentAuthenticatedUser()
      .then(user => {
        this.props.setStep('loggedin', user);
      })
      .catch(err => {
        console.log(err);
        this.signOut();
      });
  }

  signOut() {
    Auth.signOut()
      .then(() => this.props.setStep('loggedout', null))
      .catch(err => { console.log(err); });
  }

  render() {
    return null;
  }
}