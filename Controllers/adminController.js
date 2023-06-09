const db = require("../Models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = db.admin;

const register = async (req, res) => {
  try {
    //get admin input
    const { first_name, last_name, email, password, mobile_number } = req.body;
    //validate admin input
    if (!first_name || !last_name || !email || !password || !mobile_number) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //check if admin already exists
    //validate if admin already exists
    const adminExists = await admin.findOne({ where: { email } });
    if (adminExists) {
      return res
        .status(409)
        .json({ error: "admin already exists.please login" });
    }
    
    //hash password
    encryptedPassword = await bcrypt.hash(password, 10);
    //create admin
    const admin = await admin.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // email is in lowercase
      password: encryptedPassword,
      mobile_number,
    });
    //create token
    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    //save token
    admin.token = token;
    //return new admin
    return res.status(201).json(admin);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  //try {
  //get admin input
  const { email, password } = req.body;
  //search admin in database
  const admincheck = await admin.findOne({ where: { email } });
  if (!admincheck) {
    return res.status(400).json({ error: "Email not found" });
  }
  //compare password
  const isMatch = await bcrypt.compare(password, admincheck.password);
  //boolean isMatch ( )
  console.log(admincheck.password, password);
  // if (password != admincheck.password) {
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  } else {
    return res.status(200).json("logged in successfully");
  }
};

const addBook = async (req, res) => {
  const newBook = req.body;
  await db.books.create(newBook);
  return res.status(201).json(newBook);
};

const bookSearch = async (req, res) => {
  try {
    //get admin input
    const { book_id } = req.body;
    //validate admin input
    if (!book_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //search book
     const book = await db.books.findOne({ where: { id: book_id } });
    // console.log(book.title);

    return res.status(200).json(book);
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

module.exports = { register, login, addBook, bookSearch, issuedbooks };
