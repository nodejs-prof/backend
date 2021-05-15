import { Userservice } from "../services/user_service";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { Logger, SEVERITY } from "../shared/logger";

const logger = new Logger("User Controller", {});

const createUser = async (req, res) => {
  logger.log(SEVERITY.INFO, "Started saving user");
  const response = await Userservice.registerUser(req, res);
  res.send("Successfully saved" + JSON.stringify(response));
};

const getUserById = async (req, res, next) => {
  try {
    logger.log(SEVERITY.INFO, "Started retrieving user");

    var user_id = req.query.id;
    if (!user_id) {
      throw new BadRequestException("User ID not received");
    }

    const response = await Userservice.getUser(user_id, res);

    res.send("User" + JSON.stringify(response));
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res) => {
  logger.log(SEVERITY.INFO, "Signing in user");

  const response = await Userservice.signinUser(req);
};

const userController = {
  createUser,
  getUserById,
  signin,
};

export { userController };
