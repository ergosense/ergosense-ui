import { Auth } from 'aws-amplify';
import { JS } from '@aws-amplify/core';

export const ACTION_LOGIN = 'action-login';

export const STEP_LOADING = 'step-loading';
export const STEP_LOGGED_IN = 'step-logged-in';
export const STEP_VERIFY = 'step-verify';
export const STEP_LOGGED_OUT = 'step-logged-out';
export const STEP_RESET = 'step-reset';

export const createAction = (step, user) => {
  return {
    type: ACTION_LOGIN,
    payload: {
      step: step,
      user: user
    }
  };
}

export function checkUser(dispatch) {
  return Auth.currentAuthenticatedUser()
    .then(user => {
      dispatch(createAction(STEP_LOGGED_IN, user));
    })
    .catch(err => {
      console.log(err);
      logout(dispatch);
    });
}

export function login(email, password, dispatch) {
  return Auth.signIn(email, password)
    .then(user => {
      switch (user.challengeName) {
        case 'SMS_MFA':
        case 'SOFTWARE_TOKEN_MFA':
          throw new Error('No MFA page');
        case 'NEW_PASSWORD_REQUIRED':
          throw new Error('No new password pagea');
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
    });
}

export function logout(dispatch) {
  return Auth.signOut()
      .then(() => dispatch(createAction(STEP_LOGGED_OUT, null)))
      .catch(err => { console.log(err); });
}