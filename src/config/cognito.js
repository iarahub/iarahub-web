const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_duYM97Wmu',
      userPoolClientId: '5j5l279nm9o6mfss3dm2qrprb1',
      loginWith: {
        oauth: {
          domain: 'iarahub.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'openid', 'phone'],
          redirectSignIn: [window.location.origin],
          redirectSignOut: [window.location.origin],
          responseType: 'code'
        }
      }
    }
  }
};

export default awsConfig;