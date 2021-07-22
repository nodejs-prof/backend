// // const logger = new Logger("User Controller", {});
// const handler = (lambda) => {
//   return (req, res, next) => {
//     try {
//       return lambda(req);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// export { handler };

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

export { handler };
