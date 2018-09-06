import React from 'react';
import { AuthPiece } from 'aws-amplify-react';

export default class SignedIn extends AuthPiece {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signedIn'];
  }

  showComponent() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}