var catalogRouter = require("./catalog").default;
var userRouter = require("./user").default;
var authRouter = require("./auth").default;
var songRouter = require("./song").default;

const routers = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,Content-Type, Accept, Authorization"
    );
    next();
  });
  app.use("/catalog", catalogRouter);
  app.use("/user", userRouter);
  app.use("/auth", authRouter);

  //song router
  app.use("/song", songRouter);
};

export { routers };
