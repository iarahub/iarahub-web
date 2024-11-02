import { Amplify } from '@aws-amplify/core';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_4aY0YgEiy',
    userPoolWebClientId: '5j5l279nm9o6mfss3dm2qrprb1',
    oauth: {
      domain: 'iarahub.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'phone'],
      redirectSignIn: 'https://www.iarahub.com.br',
      redirectSignOut: 'https://www.iarahub.com.br',
      responseType: 'code'
    }
  }
});