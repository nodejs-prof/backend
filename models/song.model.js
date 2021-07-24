const Song = (sequelize, Sequelize) => {
  const song = sequelize.define("song", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    createdDateTime: {
      type: Sequelize.DATE,
    },
    updatedDateTime: {
      type: Sequelize.DATE,
    },
  });

  return song;
};

export { Song };
