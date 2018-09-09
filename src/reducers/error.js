/*
 | Global error reducer
 | --------------------
 | You should add any error event that you
 | want to display in the global error snackbar
 | to this reducer. If the "state.error" key exists
 | the snackbar will render with the appropriate message.
 */
import { AUTH_STATE } from './../components/auth/authenticator';
import { ACTION_CHANGE_PASSWORD } from './../components/account/security';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_STATE:
    case ACTION_CHANGE_PASSWORD:
      return { ...state, error: action.error || action.payload.error }
    default:
      return state;
  }
}