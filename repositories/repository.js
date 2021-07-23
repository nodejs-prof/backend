const create = async (model, req) => {
  return model.upsert(req);
};

const Repository = {
  create,
};

export { Repository };
