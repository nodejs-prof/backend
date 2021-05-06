import Sequelize from "sequelize";
import { Tutorial } from "./Tutorial";
import { Comment } from "./Comment";
const dbConfig = JSON.parse(process.env.DATABASE);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

const getTables = () => {
  models.Tutorial = Tutorial(sequelize, Sequelize);
  models.Comment = Comment(sequelize, Sequelize);
};

const syncTables = () => {
  getTables();
  models.sequelize.sync();
};

export { models, syncTables };
