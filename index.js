import express from "express";
import { routers } from "./router/router";

const arg = process.env.ENV;

console.log(arg);

const path = `./shared/env-${arg}.json`;

console.log("new path " + path);
require("dotenv-json-complex")({ path });

var app = express();

console.log(process.env.public_api_key);

routers(app);

app.listen(3000, () => {
  console.log(`Server running on port ${process.env.ENV}`);
});
