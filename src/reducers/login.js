import { ACTION_LOGIN } from './../components/material-auth/actions'

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}