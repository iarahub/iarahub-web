const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_bmO9UTdOf',
    userPoolWebClientId: '4810mtji22ul6ahbdi6urrvtaa',
    clientSecret: 'adddcvjgvsjmtan8mjdrpf06dd2i9tfa7r1ta17ekopkqtlfffd', // ATENÇÃO: Não exponha em produção
    oauth: {
      domain: 'your-cognito-domain.auth.us-east-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: window.location.origin,
      redirectSignOut: window.location.origin,
      responseType: 'code'
    }
  }
};

export default awsConfig;