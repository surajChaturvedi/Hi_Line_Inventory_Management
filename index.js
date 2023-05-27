const express = require("express");
const app = express();
//require model
const model = require("./Models/index");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//requiring connection
const con = require("./Config/Config");
const route = require("./Controllers/adminControllers");

// port name
const port = 3000;

app.post("/signup", route.signUp);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
