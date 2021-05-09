var catalogRouter = require("./catalog").default;
var userRouter = require("./user").default;

const routers = (app) => {
  app.use("/catalog", catalogRouter);
  app.use("/user", userRouter);
};

export { routers };
