const Event = (sequelize, Sequelize) => {
  const event = sequelize.define("events", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: Sequelize.STRING(400),
    },
    title: {
      type: Sequelize.STRING,
    },
    desc: {
      type: Sequelize.STRING(800),
    },
    eventAt: {
      type: Sequelize.DATE,
    },
    arrivalAt: {
      type: Sequelize.DATE,
    },
    type: {
      type: Sequelize.ENUM,
      values: ["PHYSICAL", "VIRTUAL"],
      allowNull: false,
    },
    link: {
      type: Sequelize.STRING(800),
    },
    isHidden: {
      type: Sequelize.BOOLEAN,
    },
    hiddenDate: {
      type: Sequelize.DATE,
    },
  });

  return event;
};

export { Event };
