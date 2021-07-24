import { Logger } from "../shared/logger";
import { TokenHandler } from "./JWT/token-handler";

const handler = (lambda) => {
  return async (req, res, next) => {
    const logger = new Logger(" ", {});

    //initial audit call : indicates the receive of the request
    // method
    try {
      var response = await lambda(req, res, next, logger);
      return res.send(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const handlerWithCurrentUser = (lambda) => {
  return async (req, res, next) => {
    const logger = new Logger(" ", {});

    try {
      const token = req.headers["authorization"];

      const user = await TokenHandler.decodeToken(token);

      var response = await lambda(req, res, next, user, logger);
      return res.send(response);
    } catch (error) {
      next(error);
    }
  };
};

export { handler, handlerWithCurrentUser };
