import { ERROR_STATUS_CODE } from "./ErrorConstants";
import { GeneralError } from "./GeneralError";

class BadRequestException extends GeneralError {
  constructor(message) {
    super(ERROR_STATUS_CODE.BAD_REQUEST, message);
  }
}

export { BadRequestException };
