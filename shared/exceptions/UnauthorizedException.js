import { ERROR_STATUS_CODE } from "./ErrorConstants";
import { GeneralError } from "./GeneralError";

class UnauthorizedException extends GeneralError {
  constructor(message) {
    super(ERROR_STATUS_CODE.UNAUTHORIZED, message);
  }
}

export { UnauthorizedException };
