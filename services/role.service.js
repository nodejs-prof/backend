import { RoleRepository } from "../repositories/role.repository";

const findRole = async (role) => {
  return await RoleRepository.findByRole(role);
};

const RoleService = {
  findRole,
};

export { RoleService };
