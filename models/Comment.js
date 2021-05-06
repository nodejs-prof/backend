import { models } from ".";

const Comment = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  Comment.belongsTo(models.Tutorial, {
    foreignKey: "tutorialId",
    as: "tutorial",
  });

  return Comment;
};

export { Comment };
