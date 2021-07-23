import { TokenHandler } from "./JWT/token-handler";

const handler = (lambda) => {
  return async (req, res, next) => {
    //initial audit call : indicates the receive of the request
    // method
    try {
      var response = await lambda(req, res, next);
      return res.send(response);
    } catch (error) {
      next(error);
    }
  };
};

const handlerWithCurrentUser = (lambda) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
     
      const user = await TokenHandler.decodeToken(token);
     
      var response = await lambda(req, res, next, user);
      return res.send(response);
    } catch (error) {
      next(error);
    }
  };
};

export { handler, handlerWithCurrentUser };
