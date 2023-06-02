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
    const { book_id, user_id } = req.body;
    //validate user input
    if (!book_id || !user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //search book and user
    const book = await db.books.findOne({ where: { id: book_id } });
    const user = await db.users.findOne({ where: { id: user_id } });
    if (!book || !user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    //issue book
    const issued_books = await db.issued_books.create({
      book_id,
      user_id,
      issued_on: new Date(),
    });
    return res.status(201).json(issued_books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const issuedbooks=async(req,res)=>{
  try{
    const issued_books=await db.issued_books.findAll({where:{user_id:req.params.id}});
    return res.status(200).json(issued_books);
  }catch(err){
    return res.status(500).json({error:err.message});
  }
}

module.exports = { register, login, bookSearch, issueBook ,issuedbooks};