const UserPart = (sequelize, Sequelize, user, part) => {
  const user_parts = sequelize.define("user_parts", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  user.hasMany(user_parts, { as: "user_parts" });
  user_parts.belongsTo(user, {
    foreignKey: "userId",
    as: "user",
  });

  part.hasMany(user_parts, { as: "part_user" });
  user_parts.belongsTo(part, {
    foreignKey: "partId",
    as: "part",
  });
  return user_parts;
};

export { UserPart };
