const UserNotification = (sequelize, Sequelize, user, notification) => {
  const user_notifications = sequelize.define("user_notifications", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pnSend: {
      type: Sequelize.BOOLEAN,
    },
    seen: {
      type: Sequelize.BOOLEAN,
    },
    type: {
      type: Sequelize.INTEGER,
    },
  });

  user.hasMany(user_notifications, { as: "user_notifications" });
  user_notifications.belongsTo(user, {
    foreignKey: "userId",
    as: "user",
  });

  notification.hasMany(user_notifications, { as: "user_notifications" });
  user_notifications.belongsTo(notification, {
    foreignKey: "notificationId",
    as: "notification",
  });
  return user_notifications;
};

export { UserNotification };
