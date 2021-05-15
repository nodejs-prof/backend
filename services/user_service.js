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

const signinUser = async (req) => {
  const { email, password } = req.body;

  const user = await UserRepository.findByEmail(email);
  console.log(user);
  console.log("*******************************");
  console.log(JSON.stringify(user));
  console.log("*******************************");
  console.log(user.user_roles);
  if (!user) {
    throw new BadRequestException("User has not registered");
  }

  // var passwordIsValid = bcrypt.compareSync(password, user.password);

  // if (!passwordIsValid) {
  //   throw new UnauthorizedException("Invalid Password");
  // }

  // var token = jwt.sign({ id: user.id }, config.secret, {
  //   expiresIn: 86400, // 24 hours
  // });

  // var authorities = [];

  // user.getRoles().then(roles => {
  //   for (let i = 0; i < roles.length; i++) {

  //   }
};

const Userservice = {
  registerUser,
  getUser,
  signinUser,
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
