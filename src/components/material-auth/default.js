import React, { Component } from 'react';
import { connect } from 'react-redux';

class Default extends Component
{
  render() {
    return (
      this.props.children
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(Default);