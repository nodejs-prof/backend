import { MODELS } from "../models";
import { Repository } from "../repositories/repository";

const initializaDatabaseTables = () => {
  const roles = ["ADMIN", "USER"];

  roles.forEach((role) => {
    Repository.create(MODELS.ROLE, { role });
  });
};

const DBService = {
  initializaDatabaseTables,
};

export { DBService };
