const create = async (model, req) => {
  return model.create(req);
};

const Repository = {
  create,
};

export { Repository };
