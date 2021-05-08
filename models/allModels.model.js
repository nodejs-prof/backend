import { Role } from "./role.model";
import { User } from "./user.model";

const ModelInitialization = (sequelize, Sequelize) => {
  const models = {
    user: User(sequelize, Sequelize),
    role: Role(sequelize, Sequelize),
  };
};

export { ModelInitialization };
