import { ACTION_LOGIN } from './../components/material-auth/actions'

const initial = {
  type: 'login-logged-out'
}

export default (state = initial, action) => {
  console.log(action);

  switch (action.type) {
    case 'login-reset':
    case 'login-signed-in':
    case 'login-error':
    case 'login-logged-out':
      return { ...state, ...action }
    default:
      return state;
  }
}