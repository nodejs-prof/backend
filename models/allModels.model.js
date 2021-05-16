import { Role } from "./role.model";
import { User } from "./user.model";
import { UserRole } from "./user_role.model";

const ModelInitialization = (sequelize, Sequelize) => {
  const user = User(sequelize, Sequelize);
  const role = Role(sequelize, Sequelize);
  const user_role = UserRole(sequelize, Sequelize, user, role);
  return {
    user,
    role,
    user_role,
  };
};

export { ModelInitialization };
