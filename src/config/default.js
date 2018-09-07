import Amplify from 'aws-amplify';

/*
 | Log level
 | ---------
 | AWS Amplify log level
 */
Amplify.Logger.LOG_LEVEL = 'DEBUG';

export default {
  // REQUIRED - Amazon Cognito Region
  region: 'eu-central-1',
  // OPTIONAL - Amazon Cognito User Pool ID
  //userPoolId: 'eu-central-1_9XCM3xuwu',
  userPoolId: 'eu-central-1_r5k9aTMZV',
  // OPTIONAL - Amazon Cognito Web Client ID
  //userPoolWebClientId: '6ka95j9n5i08a0ttpkuc3kgsn2',
  userPoolWebClientId: '1aqrpglb0o3h0apc8clmd0nid6'
};