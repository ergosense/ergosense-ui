import { GET } from './../actions/workspaces';

export default (state = {}, action) => {
  switch (action.type) {
    case GET:
      return { ...state, data: action.payload }
    default:
      return state;
  }
}