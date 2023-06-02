const express = require("express");
const app = express();

const model = require("./Models/index");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded(  { extended: true }));
app.use(bodyParser.json());

//requiring connection
const con = require("./Config/Config");

require("dotenv").config();

const router = require("./Routes/userRoutes");
app.use("/", router);

// port name
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
