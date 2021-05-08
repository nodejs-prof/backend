const User = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });
};

export { User };
