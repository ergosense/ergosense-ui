export default (state = {}, action) => {
  if (action.error) {
    return { ...state, error: action.error }
  }

  return state;
}