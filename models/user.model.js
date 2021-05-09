const User = (sequelize, Sequelize) => {

  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });
};

export const toString = () => {
  return "User(id,name,email)";
};

export { User };
