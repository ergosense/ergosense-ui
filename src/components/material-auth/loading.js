import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { State } from './';

class Loading extends Component
{
  componentDidMount() {
    console.log('checking');
    this.checkUser();
  }

  checkUser() {
    const that = this;

    return Auth.currentAuthenticatedUser()
      .then(user => {
        this.props.propogate(null, user);
      })
      .catch(err => {
        console.log(err);
        this.signOut();
      });
  }

  signOut() {
    console.log('OOPS');
    Auth.signOut()
      .then(() => this.props.propogate(State.SIGNED_OUT, null))
      .catch(err => { console.log(err); });
  }

  render() {
    return null;
  }
}

export default Loading;