import { Auth } from 'aws-amplify';
import { AuthPiece } from 'aws-amplify-react';
import { Hub } from '@aws-amplify/core';

export default class Init extends AuthPiece
{
  constructor(props) {
    super(props);

    this.checkUser = this.checkUser.bind(this);
    this.onHubCapsule = this.onHubCapsule.bind(this);
    this.signOut = this.signOut.bind(this);

    this.state = {
      authState: props.authState,
      authData: props.authData
    };

    Hub.listen('auth', this);

    // Configure AWS
    Auth.configure({
      region: this.props.region,
      userPoolId: this.props.userPoolId,
      userPoolWebClientId: this.props.userPoolWebClientId
    });
  }

  signOut() {
    Auth.signOut()
      .then(() => this.changeState('signedOut'))
      .catch(err => console.log(err));
  }

  checkUser() {
    return Auth.currentAuthenticatedUser()
      .then(user => this.changeState('signedIn', user))
      .catch(err => {
        console.log(err);
        this.signOut()
      });
  }

  onHubCapsule(capsule) {
    const { channel, payload } = capsule;
    if (channel === 'auth' && payload.event === 'configured') this.checkUser();
  }

  render() {
    return null;
  }
}