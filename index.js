const express = require("express");
const app = express();
//require model
const model = require("./Models/index");

const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

//requiring connection


const router = require("./routes/index")

//const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//requiring connection
const con = require("./Config/Config");
const route = require("./Controllers/adminControllers");

// port name
const port = 3000;

app.use('/' ,router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
