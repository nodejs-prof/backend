const UserRole = (sequelize, Sequelize) => {
  return sequelize.define("user_role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};

export { UserRole };
