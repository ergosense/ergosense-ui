function buildUser(cognitoUser) {
  return new Promise((resolve, reject) => {
    console.log(cognitoUser.getAttributes());
    resolve();
  });
}

export function signIn(email, password) {
  const auth = new AuthenticationDetails({ Username: email, Password: password });
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.authenticateUser(auth, {
      onSuccess: (result) => {
        var accessToken = result.getAccessToken().getJwtToken();
        resolve({ user: buildUser(user), token: accessToken });
      },
      onFailure: (err) => {
        reject(err);
      }
    })
  });
}