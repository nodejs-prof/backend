import { MODELS } from "../models";

const findByEmail = async (email) => {
  return await MODELS.USER.findOne({
    where: {
      email: email,
    },
  });
};

const UserRepository = {
  findByEmail,
};

export { UserRepository };
