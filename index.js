import express from "express";

const arg = process.env.ENV || "dev";

const path = `./shared/env-${arg}.json`;

require("dotenv-json-complex")({ path });

var app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { routers } = require("./router/router");
routers(app);

const exceptionHandler = require("./shared/exceptions/GlobalExceptionHandler")
  .default;
app.use(exceptionHandler);

const { Logger, SEVERITY } = require("./shared/logger");

const db = require("./models/index").default;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.listen(process.env.PORT, () => {
  Logger("app", "").log(
    SEVERITY.INFO,
    `Server running on port ${process.env.PORT}`
  );
});
