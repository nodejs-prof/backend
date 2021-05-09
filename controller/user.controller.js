import { Userservice } from "../services/user_service";
import { Logger, SEVERITY } from "../shared/logger";

const logger = new Logger("User Controller", {});

const createUser = async (req, res) => {
  logger.log(SEVERITY.INFO, "Started saving user");
  const response = await Userservice.registerUser(req, res);
  res.send("Successfully saved" + JSON.stringify(response));
};

const userController = {
  createUser,
};

export { userController };
