import { ERROR_STATUS_CODE } from "./ErrorConstants";
import { GeneralError } from "./GeneralError";

class NotFoundException extends GeneralError {
  constructor(message) {
    super(ERROR_STATUS_CODE.NOT_FOUND, message);
  }
}

export { NotFoundException };
