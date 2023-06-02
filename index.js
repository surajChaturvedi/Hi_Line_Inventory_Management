const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();


//requiring connection
require('./models/index.js');

const router = require("./routes/index")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/' ,router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
