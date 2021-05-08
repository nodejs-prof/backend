import { Role } from "./role.model";
import { User } from "./user.model";

const ModelInitialization = (sequelize, Sequelize) => {
  return {
    user: User(sequelize, Sequelize),
    role: Role(sequelize, Sequelize),
  };
};

export { ModelInitialization };
