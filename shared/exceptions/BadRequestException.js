import { ERROR_STATUS_CODE } from "./ErrorConstants";

class BadRequestException extends GeneralError {
  constructor(message) {
    super(ERROR_STATUS_CODE.BAD_REQUEST, message);
  }
}

export { BadRequestException };
