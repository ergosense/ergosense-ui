import React, { Component } from 'react';

export default class State extends Component
{
  render() {
    console.log(this.props);
    const { valid, event } = this.props;
    if (!valid(event)) return null;

    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}
