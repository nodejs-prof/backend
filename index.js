import express from "express";

const arg = process.env.ENV || "dev";

const path = `./shared/env-${arg}.json`;
require("dotenv-json-complex")({ path });

var app = express();
const { routers } = require("./router/router");
routers(app);

const { Logger, SEVERITY } = require("./shared/logger");
app.listen(process.env.PORT, () => {
  Logger("app", "").log(
    SEVERITY.INFO,
    `Server running on port ${process.env.PORT}`
  );
});
