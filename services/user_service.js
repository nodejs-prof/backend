// import { auditMethod } from "../shared/user_audits";

import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import { UserRepository } from "../repositories/user.repository";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { RoleService } from "./role.service";
import { UserRoleService } from "./user_role.service";

const registerUser = async (req) => {
  const model = MODELS.USER;
  const body = req.body;
  const { name, email, role } = body;
  const request = {
    name,
    email,
  };

  var isEmailAvailable = await validateEmailOnSave(email);

  if (isEmailAvailable) {
    return new BadRequestException("Email already exists");
  }

  var user = await Repository.create(model, request);
  var userrole = await UserRoleService.createUserRole(role, user);

  if (!userrole) {
    return new BadRequestException("Role does not exist");
  }

  const response = {
    user,
    userrole,
  };
  return response;
};

const validateEmailOnSave = async (email) => {
  return await UserRepository.findByEmail(email);
};

const Userservice = {
  registerUser,
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
