import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { default as BaseQRCode } from 'qrcode.react';

export default class QRCode extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.state, submitting: false, errors: {} };

    this.setup = this.setup.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    this.setState({ setupMessage: null });

    const user = this.props.authData;

    Auth.setupTOTP(user)
      .then((data) => {
        console.log(data);
        const code = "otpauth://totp/AWSCognito:" + user.username + "?secret=" + data + "&issuer=AWSCognito";
        setTimeout(() => {
          this.setState({ code });
        }, 5000);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { code } = this.state;

    return (
      <React.Fragment>
        <br/>
        {code && <BaseQRCode value={code} />}
        {!code && <CircularProgress />}
      </React.Fragment>
    );
  }
}