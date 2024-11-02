const awsConfig = {
  auth: {
    plugins: {
      awsCognitoAuthPlugin: {
        UserAgent: "aws-amplify/cli",
        Version: "0.1.0",
        IdentityManager: {
          Default: {}
        },
        CognitoUserPool: {
          Default: {
            PoolId: "us-east-1_4aY0YgEiy",
            AppClientId: "5j5l279nm9o6mfss3dm2qrprb1",
            Region: "us-east-1"
          }
        }
      }
    }
  },
  api: {
    plugins: {
      awsAPIPlugin: {
        restApiName: {
          endpointType: "REST",
          endpoint: "https://q16o734bj4.execute-api.us-east-1.amazonaws.com/dev",
          region: "us-east-1",
          authorizationType: "NONE"
        }
      }
    }
  }
};

export default awsConfig;