import { ERROR_STATUS_CODE } from "./ErrorConstants";
import { GeneralError } from "./GeneralError";

class Forbiddenexception extends GeneralError {
  constructor(message) {
    super(ERROR_STATUS_CODE.FORBIDDEN, message);
  }
}

export { Forbiddenexception };
