import { NotFoundException } from "../shared/exceptions/NotFoundException";

const create = (model, req) => {
  model.create(req).then(
    (res) => {
      throw new GeneralError(200, "saved successfully");
    },
    (err) => {
      throw new NotFoundException("Error in saving");
    }
  );
};

const Repository = {
  create,
};

export { Repository };
