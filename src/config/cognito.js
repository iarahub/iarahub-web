const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_duYM97Wmu',
    userPoolWebClientId: 'po627tu7qatu642tpcqh9thos',
    // Remove the clientSecret as it's not typically used in the frontend
    // Remove the oauth configuration if not needed
  }
};

export default awsConfig;