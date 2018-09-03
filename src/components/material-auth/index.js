import React, { Component} from 'react';
import { connect } from 'react-redux';

import { STEP_LOADING } from './actions';
import Loading from './loading';
import SignIn from './signin';
import NewPassword from './new-password';
import ResetPassword from './reset-password';
import Default from './default';
import { checkUser } from './actions';

class MaterialAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: STEP_LOADING,
      user: null,
      event: null
    };
  }

  componentDidMount() {
    // TODO NO!
    require('./../../config/aws');
    checkUser();
  }

  render () {
    return (
      <React.Fragment>
        <div>{JSON.stringify(this.props)}</div>
        <Loading/>
        <SignIn/>
        <ResetPassword/>
        <NewPassword/>
        <Default>
          {this.props.children}
        </Default>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(MaterialAuth);