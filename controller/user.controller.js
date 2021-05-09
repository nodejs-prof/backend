import { Userservice } from "../services/user_service";
import { GeneralError } from "../shared/exceptions/GeneralError";

const createUser = (req, res) => {
  console.log("requestingggggggg");
  console.log(req.body);
  // console.log(JSON.stringify(req));
  Userservice.registerUser(req.body, res);
  
};

const userController = {
  createUser,
};

export { userController };
