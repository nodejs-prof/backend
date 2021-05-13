import { MODELS } from "../models";

const findByRole = async (role) => {
    return await MODELS.ROLE.findOne({
      where: {
        role: role.toUpperCase(),
      },
    });
  };
  
  const RoleRepository = {
    findByRole,
  };
  
  export { RoleRepository };

