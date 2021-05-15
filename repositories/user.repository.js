import { MODELS } from "../models";

const findByEmail = async (email) => {
  return await MODELS.USER.findOne({
    where: {
      email: email,
    },
  });
};

const findById = async (id) => {
  return await MODELS.USER.findByPk(id, {
    include: [
      {
        model: MODELS.USER_ROLE,
        as: "user_roles",

        required: true,
      },
    ],
  });
};

const UserRepository = {
  findByEmail,
  findById,
};

export { UserRepository };
