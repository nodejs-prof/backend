import { AuthJWTFilter } from "../middleware/authJWT";

var catalogRouter = require("./catalog").default;
var userRouter = require("./user").default;
var authRouter = require("./auth").default;

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
};

export { routers };
