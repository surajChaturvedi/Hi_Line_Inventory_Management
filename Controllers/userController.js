const db = require("../Models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = db.users;
const sendOTPVerificationEmail = require("../Mail/sendMail");

const register = async (req, res) => {
  try {
    //get user input
    const { first_name, last_name, email, password, mobile_number } = req.body;

    //validate user input
    if (!first_name || !last_name || !email || !password || !mobile_number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //check if user already exists
    //validate if user already exists
    const userExists = await users.findOne({ where: { email } });
    if (userExists) {
      return res
        .status(409)
        .json({ error: "User already exists.please login" });
    }

    //hash password
    encryptedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await users.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // email is in lowercase
      password: encryptedPassword,
      mobile_number,
    });
    
    sendOTPVerificationEmail(user.id, email);

    //create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    //save token
    user.token = token;
    console.log(user.token);

    //return new user
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    //get user input
    const { email, password } = req.body;

    //validate user input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //validate if user exists
    const user = await users.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      //create token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      //save token 
      user.token = token;
      console.log(user.token);
      //return user
      //res.send("Login Successful");
      return res.status(200).json(user);
    }
    res.status(400).json({ error: "Invalid Credentials" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const bookSearch = async (req, res) => {
  try {
    //get user input
    const { book_id } = req.body;
    //validate user input
    if (!book_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //search book
    const book = await db.books.findOne({ where: { id: book_id } });
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const issueBook = async (req, res) => {
  try {
    //get user input
    const { book_id, user_id ,issued_on,return_date} = req.body;
    //validate user input
    if (!book_id || !user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //search book and user
    const book = await db.books.findOne({ where: { id: book_id } });
    const user = await db.users.findOne({ where: { id: user_id } });
   console.log(book.return_date);

    if (!book || !user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  
    const issued_books = await db.issued_books.create({
      book_id:book_id,
      user_id:user_id,
      issued_on: issued_on,
      return_date: return_date,
    });

    // const time = await db.issued_books.findOne({ where: { id: book_id } });
    // console.log(time.issued_on); 

   


    //  let date = new Date(time.issued_on); 
    // let date2 = new Date(time.return_date);
    // let date3 = new Date("2021-10-14"); 
    // let date4 = new Date("2021-12-20");
    // let diff = Math.abs(date2 - date);
    // let diff = Math.abs(new Date(time.issued_on) - new Date(time.return_date));
    // console.log(diff);
    // let diff2 = Math.abs(date - date4);
    // console.log(diff2);
    // var milliseconds = date.getTime();
    // console.log(milliseconds); 
     
    return res.status(201).json("Books has been issued");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, bookSearch, issueBook };
