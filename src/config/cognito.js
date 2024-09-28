import { Amplify } from '@aws-amplify/core';

Amplify.configure({
  Auth: {
    region: 'YOUR_REGION',
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID',
  }
});