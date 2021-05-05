var catalogRouter = require("./catalog").default;

const routers = (app) => {
  app.use("/catalog", catalogRouter);
};

export { routers };
