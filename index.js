const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//requiring connection
const con = require("./Config/Config");

<<<<<<< HEAD
// port name
=======
>>>>>>> d5b7a7e06891a513b28c9926ca5cb29993a7b7d1
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

