import { MODELS } from "../models";
import { Repository } from "../repositories/repository";
import { BadRequestException } from "../shared/exceptions/BadRequestException";
import { RoleService } from "./role.service";

const createUserRole = async (role, user) => {
  const role_response = await RoleService.findRole(role);

  if (!role_response) {
    return role_response;
  }

  const Role = role_response.dataValues;

  const roleId = Role.id;

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
