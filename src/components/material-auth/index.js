import React, { Component} from 'react';
import { connect } from 'react-redux';

import { STEP_LOADING } from './actions';
import Loading from './loading';
import SignIn from './signin';
import ResetPassword from './reset-password';
import Default from './default';

class MaterialAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { step: STEP_LOADING };
  }

  render () {
    return (
      <React.Fragment>
        <Loading/>
        <SignIn/>
        <ResetPassword/>
        <Default>{this.props.children}</Default>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(MaterialAuth);