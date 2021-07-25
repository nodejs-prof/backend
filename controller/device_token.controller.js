import { DeviceTokenService } from "../services/device_token.service";
import { handlerWithCurrentUser } from "../services/pre-request-handler";
import { SEVERITY } from "../shared/logger";

const create = handlerWithCurrentUser(
  async (req, res, next, userDetails, logger) => {
    logger.log(SEVERITY.INFO, "Request to create device token");

    const requestBody = req.body;

    const service = DeviceTokenService(logger);

    await service.create(userDetails, requestBody);

    return { message: "Successflly updated device token" };
  }
);

const DeviceTokenController = {
  create,
};

export { DeviceTokenController };
