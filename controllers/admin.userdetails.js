const { issuedBooksService, booksService } = require("../services");
const userServices = require("../services/user.services");
const { sequelize } = require("../models");


const addBooks = async (req, res) => {
  const { book_title, department, quantity } = req.body;
  const requestBody = {
    book_title: book_title,
    department: department,
    quantity: quantity,
  };

  const dbTxn = await sequelize.transaction();
  queryOptions = {
    transaction: dbTxn,
  };

  let addBook = await booksService.create(requestBody, queryOptions);

  if (!addBook) {
    await dbTxn.rollback();
    return res.send("Book not added");
  } else {
    await dbTxn.commit();
    return res.send("Book added");
  }
};


// Finding book details
const userdetails = async (req, res) => {
  const queryOptions = {
    where: {
      user_id: id,
    },
  };

  let checkUser = userServices.findOne(queryOptions);
  let checkBook = issuedBooksService.findAll(queryOptions);

  if (!checkUser) {
    res.json({
      message: "No such user found. Please check and student ID and confirm",
    });
  } else {
    let nameBook = booksService.findAll(checkBook.book_id);
  }
};

module.exports = { userdetails , addBooks};
