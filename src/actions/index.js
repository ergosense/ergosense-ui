const constants = {
  USER_LOGIN: 'user-login',
  USER_LOGOUT: 'user-logout'
};

export { constants }

export function login (user) {
  console.log('boo');
  return {
    type: constants.USER_LOGIN,
    user: user
  }
}