const Notification = (sequelize, Sequelize) => {
  const user = sequelize.define("notification", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topic: {
      type: Sequelize.STRING({ length: 300 }),
    },
    description: {
      type: Sequelize.STRING({ length: 500 }),
    },
    createdDateTime: {
      type: Sequelize.DATE,
    },
    lastUpdatedDateTime: {
      type: Sequelize.DATE,
    },
  });

  return user;
};

export { Notification };
