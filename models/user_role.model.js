const UserRole = (sequelize, Sequelize, user, role) => {
  const user_role = sequelize.define("user_role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  user.hasMany(user_role, { as: "user_roles" });
  user_role.belongsTo(user, {
    foreignKey: "userId",
    as: "user",
  });

  role.hasMany(user_role, { as: "role_user_roles" });
  user_role.belongsTo(role, { foreignKey: "roleId", as: "role" });
  return user_role;
};

export { UserRole };
