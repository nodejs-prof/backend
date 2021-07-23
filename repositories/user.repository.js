import { MODELS } from "../models";
import { BadRequestException } from "../shared/exceptions/BadRequestException";

const findByEmail = async (email) => {
  try {
    return await MODELS.USER.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: MODELS.USER_ROLE,
          as: "user_roles",
          include: [
            {
              model: MODELS.ROLE,
              as: "role",
              required: false,
            },
          ],
        },
      ],
    });
  } catch (error) {
    // console.log(error);
    throw new BadRequestException("Email cannot be retrieved");
  }
};

const findById = async (id) => {
  return await MODELS.USER.findByPk(id);
};

const UserRepository = {
  findByEmail,
  findById,
};

export { UserRepository };
