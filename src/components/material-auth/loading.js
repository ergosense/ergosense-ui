import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component
{
  render() {
    return (
      <div>
        loading...
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(Loading);