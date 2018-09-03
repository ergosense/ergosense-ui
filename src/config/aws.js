import { Auth, Hub } from 'aws-amplify';

Auth.configure({
  // REQUIRED - Amazon Cognito Region
  region: 'eu-central-1',
  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: 'eu-central-1_9XCM3xuwu',
  // OPTIONAL - Amazon Cognito Web Client ID
  userPoolWebClientId: '6ka95j9n5i08a0ttpkuc3kgsn2',
});