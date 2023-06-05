let express = require("express");
let app = express();
const router = require("express").Router();
let books =[];
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded(  { extended: true }));
app.use(bodyParser.json());
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const db = require("../../Models/index");
const admin = db.admin;
const adminController = require("../../Controllers/adminController");

const bookSearch = async (req, res) => {
        try {
          //get admin input
          const { book_id } = req.body;
          //validate admin input
          if (!book_id) {
            return res.status(400).json({ error: "All fields are required" });
          }
          //search book
            books = await db.books.findOne({ where: { id: book_id } });
           //console.log(books.title);               
          ejs.renderFile(path.join(__dirname, '../../Views', "report-template.ejs"), {books:books }, (err, data) => {
                if (err) {
                      res.send(err);
                } else {
                    let options = {
                        "height": "11.25in",
                        "width": "8.5in",
                        "header": {
                            "height": "20mm"
                        },
                        "footer": {
                            "height": "20mm",
                        },
                    };
                    pdf.create(data, options).toFile(" book_report.pdf", function (err, data) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send("File created successfully");
                               }
                    }) }})
                //     return res.status(200).json(books);
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
        
      };

      router.get("/generateReport", bookSearch);


        module.exports = router,{bookSearch};