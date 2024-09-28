const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_bmO9UTdOf',
    userPoolWebClientId: '4810mtji22ul6ahbdi6urrvtaa',
    oauth: {
      domain: 'your-cognito-domain.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code'
    }
  }
};

export default awsConfig;