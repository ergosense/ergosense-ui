import { AUTH_STATE } from './../components/auth/authenticator';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_STATE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}