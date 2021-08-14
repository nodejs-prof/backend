// import { auditMethod } from "../shared/user_audits";

import bcrypt from "bcryptjs/dist/bcrypt";
import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import { UserRepository } from "../repositories/user.repository";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { NotFoundException } from "../shared/exceptions/NotFoundException";
import { UnauthorizedException } from "../shared/exceptions/UnauthorizedException";
import { RoleService } from "./role.service";
import { UserRoleService } from "./user_role.service";
import jwt from "jsonwebtoken";
import { secretCode } from "../config/auth.config";
import { TokenHandler } from "./JWT/token-handler";
import CognitoService from "./cognito/CognitoService";

const registerUser = async (req) => {
  const model = MODELS.USER;
  const body = req.body;
  const { name, email, role, password, image } = body;
  const request = {
    name,
    email,
    image,
    password: bcrypt.hashSync(password, 8),
  };

  var isEmailAvailable = await validateEmailOnSave(email);

  if (isEmailAvailable) {
    return new BadRequestException("Email already exists");
  }

  const validated_role = await validateRole(role);

  if (!validated_role) {
    return new BadRequestException("Role does not exist");
  }

  var user = await Repository.create(model, request);
  var userrole = await UserRoleService.createUserRole(validated_role, user);

  const { name: nameDTO, email: emailDTO } = user;

  const response = {
    nameDTO,
    emailDTO,
    userrole,
  };
  return response;
};

//**************************** */

const registerUserV2 = async (req) => {
  const body = req.body;
  const { name, email, role = [], password, image } = body;

  await CognitoService()
    .registerUser({
      name,
      email,
      password,
      role: role.map((e) => `${e}*`),
    })
    .catch((err) => {
      console.log(err);
      throw new BadRequestException(err);
    });

  //save user in local db

  return { msg: "Registered successfully" };
};

//******************************* */

//**************************** */

const signInV2 = async (req) => {
  const { email, password } = req.body;

  const result = await CognitoService().login({ email, password });

  return result;
};

//******************************* */

const validateRole = async (role) => {
  const role_response = await RoleService.findRole(role);
  // console.log(role_response);
  if (!role_response) {
    return role_response;
  }

  const Role = role_response.dataValues;

  const roleId = Role.id;

  return roleId;
};

const validateEmailOnSave = async (email) => {
  return await UserRepository.findByEmail(email);
};

const getUser = async (user_id) => {
  const response_user = await UserRepository.findById(user_id);
  if (!response_user) {
    return new BadRequestException("User does not exist");
  }

  const { id, name, email } = response_user;
  const user_dto = {
    id,
    name,
    email,
  };

  return user_dto;
};

const retrieveCurrentUser = async (mail) => {
  const user = await UserRepository.findByEmail(mail);
  const { name, email, image, user_roles } = user;
  var roles = user_roles.map((roleObj) => roleObj.role.role);
  const response = { name, email, image, roles };
  return response;
};

const retrieveCurrentUserV2 = async (token) => {
  const result = CognitoService().verifyToken(token);
  return result;
};

const signinUser = async (req) => {
  const { email, password } = req.body;

  const user = await UserRepository.findByEmail(email);

  // console.log(JSON.stringify(user.user_roles[0].role.role));
  if (!user) {
    throw new BadRequestException("User has not registered");
  }

  var passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    throw new UnauthorizedException("Invalid Password");
  }

  const role = user.user_roles[0].role.role;

  var token = await TokenHandler.generateToken({
    id: user.id,
    email,
    role,
  });

  var authorities = [];

  user.user_roles.forEach((user_role) => {
    authorities.push("ROLE_" + user_role.role.role.toUpperCase());
  });

  const response = {
    accessToken: token,
  };

  return response;
};

const getAll = async () => {
  var dbResult = await UserRepository.findAll();
  var response = dbResult.map((user) => {
    const { id, name, image } = user;
    return {
      id,
      name,
      image,
    };
  });

  return response;
};

const Userservice = {
  registerUser,
  getUser,
  signinUser,
  retrieveCurrentUser,
  getAll,
  registerUserV2,
  signInV2,
  retrieveCurrentUserV2,
};

// @auditMethod()

// class Userservice {

//   constructor(logger){
//     this.logger = logger;
//   }

//   @auditMethod
//   registerUser() {
//     console.log("user registered");
//   }
// }

export { Userservice };
