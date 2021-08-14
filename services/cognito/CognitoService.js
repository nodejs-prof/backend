import { BadRequestException } from "../../shared/exceptions/BadRequestException";

const AWS = require("aws-sdk");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

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
      client
        .adminCreateUser({
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
              Value: "TRUE",
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
        })
        .promise()
        .then((userResult) => {
          client
            .adminSetUserPassword({
              Password: password,
              Permanent: true,
              Username: userResult.User.Username,
              UserPoolId: poolData.UserPoolId,
            })
            .promise()
            .then((res) => resolve(userResult?.User))
            .catch((err) => reject(err));
        })
        .catch((error) => reject(error));
    });
  };

  //user login
  const login = async (creadentials) => {
    return new Promise((resolve, reject) => {
      const { email, password } = creadentials;

      client
        .initiateAuth({
          ClientId: poolData.ClientId,
          AuthFlow: "USER_PASSWORD_AUTH",

          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
          },
        })
        .promise()
        .then((res) => resolve({ ...res.AuthenticationResult }))
        .catch((err) => reject(new BadRequestException(err)));
    });
  };

  const verifyToken = async (token) => {
    const url = `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`;

    let response;
    try {
      const axios = require("axios").default;
      response = await axios.get(url);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }

    const keys = response.data.keys;
    var pems = {};

    for (var i = 0; i < keys.length; i++) {
      //Convert each key to PEM
      var key_id = keys[i].kid;
      var modulus = keys[i].n;
      var exponent = keys[i].e;
      var key_type = keys[i].kty;
      var jwk = { kty: key_type, n: modulus, e: exponent };
      var pem = jwkToPem(jwk);
      console.log("key_id : " + key_id);
      pems[key_id] = pem;
    }
    //validate the token
    var decodedJwt = jwt.decode(token, { complete: true });
    if (!decodedJwt || !decodedJwt.header) {
      console.log("Not a valid JWT token");
      throw new Error("Not a valid JWT token");
    }

    var kid = decodedJwt.header.kid;
    var pem = pems[kid];
    if (!pem) {
      console.log("Invalid token");
      throw new Error("Invalid Token");
    }

    return jwt.verify(token, pem, function (err, payload) {
      if (err) {
        console.log("Invalid Token.");
        throw new Error("Invalid token");
      } else {
        console.log("Valid Token.");
        console.log(payload);
        return payload;
      }
    });
  };

  return { registerUser, login, verifyToken };
};

export default CognitoService;
