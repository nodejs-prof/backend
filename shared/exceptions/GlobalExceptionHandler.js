import { ERROR_RESPONSE_TEMPLATE } from "./ErrorConstants";
import { GeneralError } from "./GeneralError";

const exceptionHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return generalErrorConverter(res, err);
  }

  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};

const generalErrorConverter = (res, err) => {
  // console.log("**************global exception handler*************");
  // console.log(err)
  return res.status(err.statusCode).json({
    ...ERROR_RESPONSE_TEMPLATE,
    message: err.message,
    statusCode: err.statusCode,
  });
};

export default exceptionHandler;
