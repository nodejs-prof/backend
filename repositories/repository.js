import { DB } from "../models";

const create = async (model, req) => {
  return model.upsert(req);
};

const upsert = async (model, req) => {
  return model.upsert(req);
};

const findAll = async (model) => {
  return model.findAll();
};

const findById = async (model, id) => {
  return model.findOne({ where: { id } });
};

const deleteItem = async (model, id) => {
  return model.destroy({
    where: {
      id,
    },
  });
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
  findAll,
  findById,
  deleteItem,
  HandleTransaction,
  createWithTransaction,
  upsertWithTransaction,
};

export { Repository };
