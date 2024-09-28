const awsConfig = {
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_ykYdthACD',
    userPoolWebClientId: '473j0bu8m560b38d17tabbq469',
    identityPoolId: 'us-east-2:dc2d8ba2-7f45-4d53-b003-2908c38b5220',
    oauth: {
      domain: 'your-cognito-domain.auth.us-east-2.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: window.location.origin,
      redirectSignOut: window.location.origin,
      responseType: 'code'
    }
  }
};

export default awsConfig;