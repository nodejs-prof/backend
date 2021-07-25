import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { RoleService } from "./role.service";

const createUserRole = async (roleId, user) => {
  console.log("********************");
  console.log(user);
  const model = MODELS.USER_ROLE;
  const { id: userId } = user;
  const body = {
    userId,
    roleId,
  };

  return await Repository.create(model, body);
};

const UserRoleService = {
  createUserRole,
};

export { UserRoleService };
