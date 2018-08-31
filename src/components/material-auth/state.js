import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class State extends Component {
  constructor() {
    super();
    console.log(this.props);

    this.evaluteState = this.evaluteState.bind(this);
  }

  evaluteState() {
    this.props.changeStep('test');
  }

  render() {
    const { changeStep } = this.props;

    return (
      <Button onClick={this.evaluteState}>Hello!</Button>
    );
  }
}