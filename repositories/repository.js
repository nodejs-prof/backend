import { DB } from "../models";

const create = async (model, req) => {
  return model.upsert(req);
};

const upsert = async (model, req) => {
  return model.upsert(req);
};

const createWithTransaction = async (model, req, t) => {
  return model.upsert(req, { transaction: t });
};

const upsertWithTransaction = async (model, req, t) => {
  return model.upsert(req, { transaction: t });
};

const HandleTransaction = async (lamdas) => {
  const result = await DB.sequelize.transaction(lamdas);
  return result;
};

const Repository = {
  create,
  upsert,
  HandleTransaction,
  createWithTransaction,
  upsertWithTransaction,
};

export { Repository };
