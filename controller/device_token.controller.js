import { DeviceTokenService } from "../services/device_token.service";
import { handlerWithCurrentUser } from "../services/pre-request-handler";
import { SEVERITY } from "../shared/logger";

const create = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to create device token");

    const requestBody = req.body;

    const service = DeviceTokenService(logger);

    const result = await service.create(userDetails, requestBody);

    return {};
  }
);

const DeviceTokenController = {
  create,
};

export { DeviceTokenController };
