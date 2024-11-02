import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_duYM97Wmu',
      userPoolClientId: '6cngethoqj384g4qel80h99kgt',
      oauth: {
        domain: 'iarahub.auth.us-east-1.amazoncognito.com',
        scope: ['email', 'openid', 'phone'],
        redirectSignIn: 'https://www.iarahub.com.br/dashboard',
        redirectSignOut: 'https://www.iarahub.com.br',
        responseType: 'code'
      }
    }
  }
});