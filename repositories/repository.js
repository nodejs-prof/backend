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

const Repository = {
  create,
  upsert,
  findAll,
  findById,
  deleteItem,
};

export { Repository };
