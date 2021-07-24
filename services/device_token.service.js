import { DeviceTokenRepository } from "../repositories/device_token.repository";
import { Repository } from "../repositories/repository";

const DeviceTokenService = (logger) => {
  const deviceTokenRepository = DeviceTokenRepository(logger);

  const create = async (user, data) => {
    const result = await Repository.HandleTransaction(async (t) => {
      await deviceTokenRepository.deactivateAll(user.id);

      return await deviceTokenRepository.add(
        user.id,
        data.deviceId,
        data.deviceToken
      );
    });

    return result;
  };

  return { create };
};

export { DeviceTokenService };
