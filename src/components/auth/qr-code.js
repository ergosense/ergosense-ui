import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';
import { default as BaseQRCode } from 'qrcode.react';

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  progress: {
    position: 'relative',
    marginLeft: '50%',
    marginTop: '50%',
    left: '-20px',
    top: '-20px'
  }
});

class QRCode extends Component {
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
        const code = "otpauth://totp/AWSCognito:" + user.username + "?secret=" + data + "&issuer=AWSCognito";

        setTimeout(() => {
          this.setState({ code });
        }, 5000);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { size, classes } = this.props;
    const { code } = this.state;

    return (
      <React.Fragment>
        <div className={classes.container}>
        {code && <BaseQRCode value={code} size={size || 128} />}
        {!code && <CircularProgress size={40} className={classes.progress} />}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QRCode);