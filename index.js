import express from "express";
import { routers } from "./router/router";



const arg = process.env.ENV || "dev";



const path = `./shared/env-${arg}.json`;
require("dotenv-json-complex")({ path });

const { syncTables } = require("./models");

syncTables();

var app = express();

routers(app);

app.listen(3000, () => {
  console.log(`Server running on port ${process.env.ENV}`);
});
