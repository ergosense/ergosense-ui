import { Auth } from 'aws-amplify';
import { JS } from '@aws-amplify/core';

export const ACTION_LOGIN = 'action-login';

export const STEP_LOADING = 'step-loading';
export const STEP_LOGGED_IN = 'step-logged-in';
export const STEP_VERIFY = 'step-verify';
export const STEP_LOGGED_OUT = 'step-logged-out';
export const STEP_RESET = 'step-reset';
export const STEP_RESET_VERIFY = 'step-reset-verify';
export const STEP_NEW_PASSWORD = 'step-new-password';

export const createAction = (payload) => {
  return {
    type: ACTION_LOGIN,
    payload: payload
  };
}

export function checkUser() {
  return Auth.currentAuthenticatedUser()
    .then(user => createAction({ ...user }))
    .catch(err => {
      console.log("WTF!");
      console.log(err);
      logout();
    });
}

export function forgotPassword(username, dispatch) {
  return Auth.forgotPassword(username)
    .then(data => createAction({ user: null, ...username }))
    .catch(err => console.log(err));
}

export function resetForgottenPassword(username, code, password, dispatch) {
  return Auth.forgotPasswordSubmit(username, code, password)
    .then(data => createAction(null))
    .catch(err => console.log(err));
}

export function newPassword(user, password, requiredAttributes, dispatch) {
  return Auth.completeNewPassword(user, password, requiredAttributes)
    .then(user => dispatchChallenge(user, dispatch))
    .catch(err => console.log(err));
}

export function login(email, password, dispatch) {
  return Auth.signIn(email, password);
}

export function logout(dispatch) {
  return Auth.signOut()
      .then(() => {

      })
      .catch(err => { console.log(err); });
}

function dispatchChallenge(user, dispatch) {
  console.log(user);

  switch (user.challengeName) {
    case 'SMS_MFA':
    case 'SOFTWARE_TOKEN_MFA':
      throw new Error('No MFA page');
    case 'NEW_PASSWORD_REQUIRED':
      dispatch(createAction(STEP_NEW_PASSWORD, user));
      return user;
    case 'MFA_SETUP':
      throw new Error('MFA not setup');
    default:
      return Auth.verifiedContact(user)
        .then(data => {
          if (JS.isEmpty(data.verified)) {
            dispatch(createAction(STEP_VERIFY, user));
          } else {
            dispatch(createAction(STEP_LOGGED_IN, Object.assign(user, data)));
          }
        });
  }
}