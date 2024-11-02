const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_duYM97Wmu',
    userPoolWebClientId: '5j5l279nm9o6mfss3dm2qrprb1',
    oauth: {
      domain: 'iarahub.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'openid', 'phone'],
      redirectSignIn: window.location.origin,
      redirectSignOut: window.location.origin,
      responseType: 'code'
    },
    cookieStorage: {
      domain: window.location.hostname,
      path: '/',
      expires: 365,
      sameSite: "strict",
      secure: true
    }
  }
};

export default awsConfig;