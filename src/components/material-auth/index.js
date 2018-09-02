import React, { Component} from 'react';
import { connect } from 'react-redux';

import Loading from './loading';
import SignIn from './signin';
import Default from './default';

class MaterialAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 'loading' };
    this.setStep = this.setStep.bind(this);
  }

  setStep(step, user) {
    this.setState({ step, user });
  }

  render () {
    return (
      <React.Fragment>
        <Loading step={this.state.step} setStep={this.setStep}/>
        <SignIn step={this.state.step}  setStep={this.setStep} />
        <Default step={this.state.step}>{this.props.children}</Default>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.login }
};

export default connect(mapStateToProps)(MaterialAuth);