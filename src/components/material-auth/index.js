import React, { Component} from 'react';

import Loading from './loading';
import SignIn from './signin';

export const State = {
  LOADING: 'loading',
  SIGNED_OUT: 'signedout'
};

export default class MaterialAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: props.step || State.LOADING,
      user: null
    }

    this.propogate = this.propogate.bind(this);
  }

  propogate(step, user) {
    console.log(step);
    console.log(user);
    console.log({ step, user });
    this.setState({ step, user });
  }

  render () {
    switch (this.state.step) {
      case State.LOADING:
        return (<Loading propogate={this.propogate}/>)
      case State.SIGNED_OUT:
        return (<SignIn propogate={this.propogate}/>)
      default:
        return (<div>{this.props.children}</div>)
    }
  }
}