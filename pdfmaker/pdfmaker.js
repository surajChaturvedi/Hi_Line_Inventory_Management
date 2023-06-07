let express = require("express");
let app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
let ejs = require("ejs");
app.set('view engine', 'ejs');
let pdf = require("html-pdf");
let path = require("path");
require("../models");
const {
  userService,
  issuedBooksService,
  booksService,
} = require("../services");
const { log } = require("console");


const userPdf = async (req, res) => {
  const user_id = req.body.user_id;
  if (!user_id) {
    res.json({
      message: "Empty otp details is not allowed.",
    });
  } else {
    queryOptions = {
      where: {
        id: user_id,
      },
    };
    let userDetails = await userService.findOne(queryOptions);  
    let userName = userDetails.first_name;
    
    // To check how many books user issued

    queryOptions2 = {
      where: {
        user_id: user_id,
      },
    };
    let { rows, count } = await issuedBooksService.findAndCountAll(
      queryOptions2
    );
    // console.log(rows[0].issued_on);
    let findBookId = [];
    for (let i = 0; i < count; i++) {
      findBookId.push(rows[i].book_id);
    }
    // console.log("Arr: ", findBookId);

    queryOptions3 = {
      //include: [{model: Tag, as: 'tags'}],
    //   where: { id: { in: findBookId } },
      where: { id: findBookId },
    };
    let bookName = await booksService.findAll(queryOptions3);
    // console.log(bookName[0].book_title);

      ejs.renderFile(
        path.join(__dirname, '../views', 'report-template.ejs'),
        {   count : count,
            userId: user_id,
            bookName : bookName,
            userName : userName,
            rows : rows
          },

 
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
            let options = {
              height: "11.25in",
              width: "8.5in",
              header: {
                height: "20mm",
              },
              footer: {
                height: "20mm",
              },
            };
            pdf
              .create(data, options)
              .toFile(" book_report.pdf", function (err, data) {
                if (err) {
                  res.send(err);
                } else {
                  res.send("File created successfully");
                }
              });
          }
        }
      );
    //     return res.status(200).json(books);
  }
};

// router.get("/generateReport", bookadded);
module.exports = { userPdf };
