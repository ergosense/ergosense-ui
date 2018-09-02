export function verify(user) {
  return {
    type: constants.ACTION_LOGIN,
    payload: {
      step: constants.STEP_VERIFY,
      user: user
    }
  }
}

export function login(user) {
  return {
    type: constants.ACTION_LOGIN,
    payload: {
      step: null,
      user: user
    }
  }
}

export function logout() {
  Auth.signOut()
      .then(() => this.props.setStep('loggedout', null))
      .catch(err => { console.log(err); });
}