const create = async (model, req) => {
  return model.create(req);
};

const upsert = async (model,req) =>{
  return model.upsert(req);
}

const Repository = {
  create,
  upsert
};

export { Repository };
