import { Repository } from "./repository";
import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";
import { SEVERITY } from "../shared/logger";

const DeviceTokenRepository = (logger) => {
  const deactivateAll = async (userId, t) => {
    try {
      return await MODELS.DEVICE_TOKEN.update(
        {
          active: false,
        },
        {
          where: {
            userId,
          },
          returning: true,
          plain: true,
          transaction: t,
        }
      );
    } catch (error) {
      logger.log(SEVERITY.ERROR, "Error occured in deactivating old devices");
      logger.log(SEVERITY.ERROR, error);
      throw new GeneralError(500, "Old Devices deavtivation fails");
    }
  };

  const add = async (userId, deviceId, token, t) => {
    try {
      const result = await MODELS.DEVICE_TOKEN.findOrCreate({
        where: {
          userId,
          deviceId,
        },
        defaults: {
          active: true,
          deviceToken: token,
        },
        transaction: t,
      });

      let response = result;
      let [deviceToken, created] = result;

      if (!created) {
        const data = {
          id: deviceToken.id,
          deviceId,
          active: true,
          deviceToken: token,
        };

        response = await Repository.upsertWithTransaction(
          MODELS.DEVICE_TOKEN,
          data,
          t
        );
      }

      return response;
    } catch (error) {
      logger.log(SEVERITY.ERROR, "Error occured in updating device token");
      logger.log(SEVERITY.ERROR, error);
      throw new GeneralError(500, "Device Token update Fails");
    }
  };

  return { deactivateAll, add };
};

export { DeviceTokenRepository };
