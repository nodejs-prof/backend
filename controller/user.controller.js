import { Userservice } from "../services/user_service";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { Logger, SEVERITY } from "../shared/logger";
import { handler } from "../services/pre-request-handler";
import { TokenHandler } from "../services/JWT/token-handler";

const logger = new Logger("User Controller", {});

const createUser = async (req, res) => {
  logger.log(SEVERITY.INFO, "Started saving user");
  const response = await Userservice.registerUser(req, res);
  res.send(JSON.stringify(response));
};

const getUserById = async (req, res, next) => {
  try {
    logger.log(SEVERITY.INFO, "Started retrieving user");

    var user_id = req.query.id;
    if (!user_id) {
      throw new BadRequestException("User ID not received");
    }

    const response = await Userservice.getUser(user_id, res);

    res.send(JSON.stringify(response));
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = handler(async (req, res, next) => {
  const token = req.headers["authorization"];

  const user = await TokenHandler.decodeToken(token);

  const { email, ...rest } = user;

  const currentUser = await Userservice.retrieveCurrentUser(email);

  return currentUser;
});

const signin = handler(async (req, res, next) => {
  logger.log(SEVERITY.INFO, "Signing in user");

  const response = await Userservice.signinUser(req);
  return response;
});

const userController = {
  createUser,
  getUserById,
  signin,
  getCurrentUser,
};

export { userController };
