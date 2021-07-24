import { Repository } from "./repository";
import { MODELS } from "../models";
import { GeneralError } from "../shared/exceptions/GeneralError";

const DeviceTokenRepository = (logger) => {
  const deactivateAll = async (userId, t) => {
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
  };

  const add = async (userId, deviceId, token, t) => {
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
  };

  return { deactivateAll, add };
};

export { DeviceTokenRepository };
