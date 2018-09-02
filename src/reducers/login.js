import { constants } from './../actions'

export default (state = {}, action) => {
  console.log('reducing');
  console.log(action);
  switch (action.type) {
    case constants.USER_LOGIN:
      return { ...state, ...action.payload }
    case constants.USER_LOGOUT:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}