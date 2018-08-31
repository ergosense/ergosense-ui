import { constants } from './../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case constants.USER_LOGIN:
      return { ...state, user: action.user }
    case constants.USER_LOGOUT:
      return { ...state, user: null }
    default:
      return state;
  }
}