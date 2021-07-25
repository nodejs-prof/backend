var catalogRouter = require("./catalog").default;
var userRouter = require("./user").default;
var authRouter = require("./auth").default;
var songRouter = require("./song").default;
var partRouter = require("./part").default;
var notificationRouter = require("./notification").default;
var deviceTokenRouter = require("./deviceToken").default;

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
  app.use("/part", partRouter);

  //notification router
  app.use("/notification", notificationRouter);
  app.use("/deviceToken", deviceTokenRouter);
};

export { routers };
