import { ModelInitialization } from "./allModels.model";
import { Sequelize } from "sequelize";

const DBConfig = JSON.parse(process.env.DATABASE);

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
  SONG: db.song,
  Notification: db.notification,
  User_Notification: db.userNotification,
  DEVICE_TOKEN: db.deviceToken,
};

const initializeDatabase = async () => {
  // RelationshipGenerator();
  return await db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    // DBService.initializaDatabaseTables();
    return;
  });
};

export { initializeDatabase, MODELS };
