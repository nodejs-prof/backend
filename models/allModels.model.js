import { DeviceToken } from "./device_token.model";
import { Event } from "./event.model";
import { Notification } from "./notification.model";
import { Part } from "./part.model";
import { Role } from "./role.model";
import { Song } from "./song.model";
import { User } from "./user.model";
import { UserNotification } from "./user.notification.model";
import { UserRole } from "./user_role.model";

const ModelInitialization = (sequelize, Sequelize) => {
  //auth models
  const user = User(sequelize, Sequelize);
  const role = Role(sequelize, Sequelize);
  const user_role = UserRole(sequelize, Sequelize, user, role);

  //song models
  const song = Song(sequelize, Sequelize);
  const part = Part(sequelize, Sequelize, song);

  const notification = Notification(sequelize, Sequelize);
  const userNotification = UserNotification(
    sequelize,
    Sequelize,
    user,
    notification
  );
  const deviceToken = DeviceToken(sequelize, Sequelize, user);
  const event = Event(sequelize, Sequelize);
  return {
    user,
    role,
    user_role,
    song,
    part,
    notification,
    userNotification,
    deviceToken,
    event,
  };
};

export { ModelInitialization };
