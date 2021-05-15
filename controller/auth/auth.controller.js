import { Userservice } from "../../services/user_service";

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { UserRepository } = require("../../repositories/user.repository");

const signin = async (req, res) => {
  const response = await Userservice.signinUser(req.body);
};

const AuthController = {
  signin,
};

export { AuthController };
