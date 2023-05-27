const userSignupSchema = require("../validation/auth.validation");
const User = require('../models/users');
const { genrateHash, findHash } = require("../utils/bcrypt");

// Jsonwebtoken
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

const register = (req, res) => {
  const { error, value } = userSignupSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.send("Invalid Request: " + JSON.stringify(error));
  }

  async function checkUser() {
    let checkEmail = await User.findOne({ where: { email: value.email } });
    let checkMobile = await User.findOne({ where: { mobile: value.mobile } });
    if (checkEmail) {
      return res.send("Email already exists");
    } else if (checkMobile) {
      return res.send("Mobile already exists");
    } else {
      return next();
    }
  }

  async function next() {
    //var postData = req.body;
    let postPass = await genrateHash(value.password);
    console.log("This is postUser console log " + postPass);
    value.password = postPass;
    let data = await User.create(value);
    //res.send(200).json({ data: data });
    return res.send("Successfully inside user: " + JSON.stringify(data));
  }
  return checkUser();
};

// Login Part

const login = (req, res) => {
  const { error, email } = req.body;
  if (error) {
    // return res.send("Invalid Request: " + JSON.stringify(error));
    return res.send(`Invalid Request: ${JSON.stringify(error)}`)
  }
  async function checkLogin() {
    const check = await User.findOne({
      where: {
        //[Op.and]:  by default it will take AND condition for OR we will take [Op.OR]
        email: email,
      },
    });
    if (check) {
      let password = req.body.password;
      let passwordMatched = await findHash(password, check.password);
      //console.log(passwordMatched);
      if (passwordMatched) {
        res.send(`${check.first_name} logged in`);

        // JWT part
        let token;
        try {
          //Creating jwt token
          token = jwt.sign(
            {
              //email: check.email,
              userId: user.id
              //, email: existingUser.email
            },
            "secretKey",
            { expiresIn: "300s" }
          );
        } catch (err) {
          console.log(err);
          const error = new Error("Error! Something went wrong.");
          return next(error);
        }

        res.status(200).json({
          success: true,
          data: {
            //userName:req.body.userName,
            userId :user.id,
            //email: existingUser.email,
            token: token,
          },
        });
      } else {
        res.json({message:"Invalid username/password"});
      }
    } else {
      res.json({message:"User not found"});
    }
  }
  return checkLogin();
};

module.exports = { register, login };
