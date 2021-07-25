const Part = (sequelize, Sequelize, song) => {
  const part = sequelize.define("part", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.INTEGER,
    },
    audioURL: {
      type: Sequelize.STRING,
    },
    sheetURL: {
      type: Sequelize.STRING,
    },
    lyrics: {
      type: Sequelize.STRING,
    },
    createdDateTime: {
      type: Sequelize.DATE,
    },
    updatedDateTime: {
      type: Sequelize.DATE,
    },
  });

  song.hasMany(part, { as: "part" });
  part.belongsTo(song, {
    foreignKey: "songId",
    as: "song",
  });

  return part;
};

export { Part };
