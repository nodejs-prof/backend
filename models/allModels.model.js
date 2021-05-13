import { Role } from "./role.model";
import { User } from "./user.model";
import { UserRole } from "./user_role.model";

const ModelInitialization = (sequelize, Sequelize) => {
  return {
    user: User(sequelize, Sequelize),
    role: Role(sequelize, Sequelize),
    user_role: UserRole(sequelize, Sequelize),
  };
};

export { ModelInitialization };
