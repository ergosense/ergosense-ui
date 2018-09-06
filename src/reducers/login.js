const initial = {
  type: 'login-logged-out'
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'login-reset':
    case 'login-signed-in':
    case 'login-error':
    case 'login-logged-out':
    case 'login-verified':
      return { ...state, ...action }
    default:
      return state;
  }
}