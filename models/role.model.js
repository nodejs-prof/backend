const Role = (sequelize, Sequelize) => {
  return sequelize.define("role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
};

export { Role };
