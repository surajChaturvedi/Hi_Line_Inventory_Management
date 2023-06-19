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

// const users = require("../../Models/users");
const { Op } = require("sequelize");
const userFine = require("../Mail/sendMailFine");

const showfine = async (req, res) => {
  try {
    //get admin input
    const user_id = req.body.user_id;
    // console.log(user_id);
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
      console.log(userDetails[0].email)  

    //  let date1 = new Date(userDetails[0].issued_books[0].issued_on); 
    let date2 = new Date(userDetails[0].issued_books[0].return_date);
   let date3 = Date.now(); 
   var date1 = new Date( date3);

   console.log("this date 3 " + date1)
   console.log("this date 2 "+ date2) 
    
    let diff = Math.abs(date1 - date2);
    // let diff = Math.abs(new Date(time.issued_on) - new Date(time.return_date));
    console.log( "this is difference of dates " + diff);
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(days);
    if(days>30)
    {
      fine = Math.floor((days-30) * 10);
      console.log("Here is your fine : " + fine);
      userFine(userDetails[0].email,fine);
    }
    console.log(" outside bracket Here is your fine : " + fine);
  ejs.renderFile(
    path.join(__dirname, "../Views", "fine-report.ejs"),
          {
        userDetails: userDetails,
        fine: fine,
      days: days
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
          .toFile(" Fine_report.pdf", function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.send("Pdf File created successfully");
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

router.get("/generateFineReport", showfine);
module.exports = router;
