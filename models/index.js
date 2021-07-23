import { DBConfig } from "../config/db.config";
import { ModelInitialization } from "./allModels.model";
import { Sequelize } from "sequelize";
import { RelationshipGenerator } from "./relationship_generator";
import { DBService } from "../services/db.service";

// const DBConfig = JSON.parse(process.env.DATABASE)

const sequelize = new Sequelize(DBConfig.DB, DBConfig.USER, DBConfig.PASSWORD, {
  host: DBConfig.HOST,
  dialect: DBConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: DBConfig.pool.max,
    min: DBConfig.pool.min,
    acquire: DBConfig.pool.acquire,
    idle: DBConfig.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
  ...ModelInitialization(sequelize, Sequelize),
};

const MODELS = {
  USER: db.user,
  ROLE: db.role,
  USER_ROLE: db.user_role,
  Notification: db.notification,
  User_Notification: db.userNotification,
};

const initializeDatabase = () => {
  // RelationshipGenerator();
  db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    DBService.initializaDatabaseTables();
  });
};

export { initializeDatabase, MODELS };
