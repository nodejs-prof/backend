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

const registerUser = async (req) => {
  const model = MODELS.USER;
  const body = req.body;
  const { name, email, role, password } = body;
  const request = {
    name,
    email,
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
  const { name, email, user_roles } = user;
  const response = { name, email, user_roles };
  return response;
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
    // id: user.id,
    // email: user.email,
    // roles: authorities,
    accessToken: token,
  };

  console.log(response);

  return response;
};

const Userservice = {
  registerUser,
  getUser,
  signinUser,
  retrieveCurrentUser,
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
