const AWS = require("aws-sdk");
const poolData = {
  UserPoolId: process.env.POOL_ID, // Your user pool id here
  ClientId: process.env.CLIENT_ID, // Your client id here
};
const pool_region = process.env.REGION;

const CognitoService = () => {
  const { CognitoIdentityServiceProvider } = AWS;
  const client = new CognitoIdentityServiceProvider({
    apiVersion: process.env.API_VERSION,
    region: pool_region,
  });

  const registerUser = async ({ name, email, role = "ADMIN", password }) => {
    console.log({ name, email, role, password });
    return new Promise((resolve, reject) => {
      client.adminCreateUser(
        {
          // ClientId: poolData.ClientId,
          Password: password,
          UserPoolId: poolData.UserPoolId,
          Username: email,
          MessageAction: "SUPPRESS",

          UserAttributes: [
            {
              Name: "email",
              Value: email,
            },
            {
              Name: "custom:custom_roles",
              Value: role,
            },
            {
              Name: "email_verified",
              Value: true,
            },
            {
              Name: "family_name",
              Value: name,
            },
            {
              Name: "given_name",
              Value: name,
            },
          ],
        },
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          client.adminSetUserPassword(
            {
              Password: password,
              Permanent: true,
              Username: res.User.Username,
              UserPoolId: poolData.UserPoolId,
            },
            (error, resp) => {
              if (error) {
                console.log(error);
                return reject(error);
              }

              resolve(resp);
            }
          );
        }
      );
    });
  };

  return { registerUser };
};

export default CognitoService;
