import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { Repository } from "./repository";

const UserPartRepository = () => {
  const create = async (userId, partId, t) => {
    try {
      const result = await Repository.createWithTransaction(
        MODELS.USER_PART,
        { userId, partId },
        t
      );

      return result;
    } catch (error) {
      //   console.log(error);
      throw new GeneralError(500, "Error Occured in creating user_part record");
    }
  };

  const deleteUserPart = async (partId) => {
    try {
      await MODELS.USER_PART.destroy({
        where: {
          partId,
        },
      });
    } catch (error) {
      throw new GeneralError(
        500,
        "Error Occured in deleting exsiting user_part records"
      );
    }
  };

  return {
    create,
    deleteUserPart,
  };
};

export { UserPartRepository };
