import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkUser } from './actions';

class Loading extends Component
{
  componentDidMount() {
    checkUser(this.props.dispatch);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(Loading);