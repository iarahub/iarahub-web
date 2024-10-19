const awsConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_4aY0YgEiy',
    userPoolWebClientId: '7h7m2dsvgri8kl381egrtth36o',
    // Note: Storing clientSecret on the client side is not recommended for security reasons.
    // Consider handling authentication on the server side if possible.
    clientSecret: '1m1i0ukjdq5du4nl4gmk6ipi2ilrbhetknejvtemsgq3cqhsjc0s',
  }
};

export default awsConfig;