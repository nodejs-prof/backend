import { DBConfig } from "../config/db.config";
import { ModelInitialization } from "./allModels.model";
import { Sequelize } from "sequelize";

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
  models: ModelInitialization(sequelize, Sequelize),
};

export { db };
