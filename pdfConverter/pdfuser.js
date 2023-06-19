let express = require("express");
let app = express();
const router = require("express").Router();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
const model = require('../Models/index');

const adminController = require("../Controllers/adminController");
// const users = require("../../Models/users");
const { Op } = require("sequelize");

const userInfo = async (req, res) => {
  try {
    //get admin input
    const user_id = req.body.user_id;
    console.log(user_id);
    //validate admin input
    if (!user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
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

     // let userDetails = await users.findAll(queryOptions);
      let userDetails = await model.users.findAll(queryOptions);
      console.log(console.log(userDetails[0].issued_books[0].book.title)
      )

    // let checkDate ;
    // let checkDate;
    //  for(let i =0; i < userDetails.length;i++) {
    //     for(let j =0;j < userDetails[i].issued_books.length;j++){
    //       let checkDate = userDetails[i].issued_books[j].issued_on;
    //     }
    //   }
    // let newDate = checkDate.getDate();

  ejs.renderFile(
    path.join(__dirname, "../Views", "user-report.ejs"),
          {
        userDetails: userDetails
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
          .toFile(" user_report.pdf", function (err, data) {
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
catch(err){
  console.log(err);
}
}

router.get("/generateUserReport", userInfo);
module.exports = router;
