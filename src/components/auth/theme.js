import { AmplifyTheme } from 'aws-amplify-react';

const MyTheme = Object.assign({}, AmplifyTheme, {
  toast: {
    display: 'none'
  }
});

export default MyTheme;