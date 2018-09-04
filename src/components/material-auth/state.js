import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function state(WrappedComponent, validator) {
  class _Wrapped extends Component {
    render() {
      if (!validator(this.props)) return null;
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { ...state.login }
  };

  return connect(mapStateToProps)(_Wrapped);
}