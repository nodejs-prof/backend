import { MODELS } from "../models";

const initializaDatabaseTables = () => {
  const roles = ["ADMIN", "USER"];

  roles.forEach((role) => {
    MODELS.ROLE.findOrCreate({
      where: {
        role,
      },
    });
  });
};

const DBService = {
  initializaDatabaseTables,
};

export { DBService };
