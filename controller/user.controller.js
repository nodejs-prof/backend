import { Userservice } from "../services/user_service";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { Logger, SEVERITY } from "../shared/logger";
import {
  handler,
  handlerWithCurrentUser,
} from "../services/pre-request-handler";

const logger = new Logger("User Controller", {});

const createUser = async (req, res) => {
  logger.log(SEVERITY.INFO, "Started saving user");
  const response = await Userservice.registerUser(req, res);
  res.send(JSON.stringify(response));
};

const getCurrentUser = handlerWithCurrentUser(
  async (req, res, next, userDetails,logger) => {
    logger.log(SEVERITY.INFO,"Request to get current user")
    const { email } = userDetails;
    const currentUser = await Userservice.retrieveCurrentUser(email);

    return currentUser;
  }
);

const signin = handler(async (req, res, next,logger) => {
  logger.log(SEVERITY.INFO, "Sign in user");

  const response = await Userservice.signinUser(req);
  return response;
});

const userController = {
  createUser,
  signin,
  getCurrentUser,
};

export { userController };
