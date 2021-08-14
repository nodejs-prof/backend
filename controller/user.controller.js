import { Userservice } from "../services/user_service";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { Logger, SEVERITY } from "../shared/logger";
import {
  handler,
  handlerWithCurrentUser,
} from "../services/pre-request-handler";

const logger = new Logger("User Controller", {});

const createUser = handler(async (req, res) => {
  logger.log(SEVERITY.INFO, "Started saving user");
  const response = await Userservice.registerUser(req, res);
  res.send(JSON.stringify(response));
});

const createUserWithCognito = handler(async (req, res) => {
  logger.log(SEVERITY.INFO, "Started saving user");
  const response = await Userservice.registerUserV2(req, res);
  res.send(JSON.stringify(response));
});

const getCurrentUser = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to get current user");
    const { email } = userDetails;
    const currentUser = await Userservice.retrieveCurrentUser(email);

    return currentUser;
  }
);

const getCurrentUserV2 = async (req, res, next) => {
  // logger.log(SEVERITY.INFO, "Request to get current user");
  // const { email } = userDetails;
  const token = req.headers["authorization"];
  const currentUser = await Userservice.retrieveCurrentUserV2(token);

  return currentUser;
};

const signin = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to login");

  const response = await Userservice.signinUser(req);
  return response;
});

const signinV2 = handler(async (req, res, next, logger) => {
  logger.log(SEVERITY.INFO, "Request to login");

  const response = await Userservice.signInV2(req);
  return response;
});

const getAllUsers = handler(async () => {
  const response = await Userservice.getAll();
  return response;
});

const userController = {
  createUser,
  signin,
  getCurrentUser,
  getAllUsers,
  createUserWithCognito,
  signinV2,
  getCurrentUserV2,
};

export { userController };
