import React, { Component } from 'react';
import { connect } from 'react-redux';

class Default extends Component
{
  render() {
    console.log('step');
    console.log(this.props.step);
    // Skip if current auth step exists
    if (this.props.step !== 'loggedin') return null;

    return (
      this.props.children
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(Default);