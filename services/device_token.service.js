import { DeviceTokenRepository } from "../repositories/device_token.repository";
import { Repository } from "../repositories/repository";
import { SEVERITY } from "../shared/logger";

const DeviceTokenService = (logger) => {
  const deviceTokenRepository = DeviceTokenRepository(logger);

  const create = async (user, data) => {
    const result = await Repository.HandleTransaction(async (t) => {
      logger.log(
        SEVERITY.DEBUG,
        `deavtivating all devides for user-id : ${user.id}`
      );
      await deviceTokenRepository.deactivateAll(user.id);

      return await deviceTokenRepository.add(
        user.id,
        data.deviceId,
        data.deviceToken,
        t
      );
    });

    return result;
  };

  return { create };
};

export { DeviceTokenService };
