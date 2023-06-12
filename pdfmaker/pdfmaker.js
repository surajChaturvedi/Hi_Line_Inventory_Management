let express = require("express");
let app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let ejs = require("ejs");
app.set("view engine", "ejs");
let pdf = require("html-pdf");
let path = require("path");
const {
  userService,
  issuedBooksService,
  booksService,
} = require("../services");
const { log } = require("console");
const model = require('../models/index');
const {Op} = require('sequelize');

const userPdf = async (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id)
  // for (let i = 0; i < user_id.length; i++) {
  //   }
  if (!user_id) {
    res.json({
      message: "Empty details is not allowed.",
    });
  } else {

    queryOptions = {
      where: {
        id : user_id,
      },
      include: [
        { 
          model: model.issued_books,
          include: [
            { 
              model: model.books,
              // attributes: ['book_title' , 'department'],
            }
          ]
        }
      ]
    };
    let userDetails = await userService.findAll(queryOptions);
    console.log(userDetails[0].issued_books[0].book_id)
    let userName = userDetails[0].first_name + " " + userDetails[0].last_name;
    // let checkDate ;
     for(let i =0; i < userDetails.length;i++) {
        for(let j =0;j < userDetails[i].issued_books.length;j++){
          let checkDate = userDetails[i].issued_books[j].issued_on;
        }
      }
    let newDate = checkDate.getDate();
    console.log(newDate);
    // console.log(userDetails.issued_books[0].issued_on);
    // console.log(userDetails.issued_books[0].book.book_title);
    // console.log(userDetails.issued_books.length);

    // To check how many books user issued

                                                //  taking each service to find value 
    // queryOptions2 = {
    //   where: {
    //     user_id: user_id,
    //   },
    // };
    // let { rows, count } = await issuedBooksService.findAndCountAll(
    //   queryOptions2
    // );
    // // console.log(rows[0].issued_on);
    // let findBookId = [];
    // for (let i = 0; i < count; i++) {
    //   findBookId.push(rows[i].book_id);
    // }
    // // console.log("Arr: ", findBookId);

    // queryOptions3 = {
    //   //include: [{model: Tag, as: 'tags'}],
    //   //   where: { id: { in: findBookId } },
    //   where: { id: findBookId },
    // };
    // let bookName = await booksService.findAll(queryOptions3);
    // console.log(bookName[0].book_title);

    ejs.renderFile(
      path.join(__dirname, "../views", "report-template.ejs"),
      {
        userDetails: userDetails,
        newDate : newDate,
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
  }
};

// router.get("/generateReport", bookadded);
module.exports = { userPdf };
