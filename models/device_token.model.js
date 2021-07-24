const DeviceToken = (sequelize, Sequelize, user) => {
  const device_token = sequelize.define("device_token", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deviceId: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
    deviceToken: {
      type: Sequelize.STRING(500),
    },
  });

  user.hasMany(device_token, { as: "device_token" });
  device_token.belongsTo(user, {
    foreignKey: "userId",
    as: "device",
  });

  return device_token;
};

export { DeviceToken };
