import { Notification } from "./notification.model";
import { Role } from "./role.model";
import { User } from "./user.model";
import { UserNotification } from "./user.notification.model";
import { UserRole } from "./user_role.model";

const ModelInitialization = (sequelize, Sequelize) => {
  const user = User(sequelize, Sequelize);
  const role = Role(sequelize, Sequelize);
  const user_role = UserRole(sequelize, Sequelize, user, role);
  const notification = Notification(sequelize, Sequelize);
  const userNotification = UserNotification(sequelize, Sequelize, user, notification)
  return {
    user,
    role,
    user_role,
    notification,
    userNotification
  };
};

export { ModelInitialization };
