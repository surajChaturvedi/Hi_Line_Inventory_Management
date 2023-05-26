const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//requiring connection
const con = require("./Config/Config");

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})
