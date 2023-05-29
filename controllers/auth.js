const userSignupSchema = require("../validation/auth.validation");
//const User = require("../models/users");
const { genrateHash, findHash } = require("../utils/bcrypt");
const sendOTPVerificationEmail = require("../mail/sendmail");

// Jsonwebtoken
const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const { sequelize } = require("../models");

const register = async (req, res) => {
  let queryOptions, requestBody;
  const { error, value } = userSignupSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.send("Invalid Request: " + JSON.stringify(error));
  }

  queryOptions = {
    where: {
      email: value.email,
    },
  };
  let checkEmail = await userService.findOne(queryOptions);

  if (checkEmail) {
    res.json({
      message: "user account already created",
    });
  } else {
    const dbTxn = await sequelize.transaction();
    let postPass = await genrateHash(value.password);
    //console.log("This is postUser console log " + postPass);
    value.password = postPass;
    requestBody = {
      ...value, // Spread operator
    };
    queryOptions = {
      transaction: dbTxn,
    };
    let createUser = await userService.create(requestBody, queryOptions);
    if (!createUser) {
      await dbTxn.rollback();
      return res.send("user not created");
    } else {
      await dbTxn.commit();
      var id = createUser.id;
      var email = requestBody.email;
      sendOTPVerificationEmail( {id, email},res);
      return res.send("user added");
    }
  }
};

// Login Part

const login = (req, res) => {
  const { error, email } = req.body;
  if (error) {
    // return res.send("Invalid Request: " + JSON.stringify(error));
    return res.send(`Invalid Request: ${JSON.stringify(error)}`);
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
              userId: user.id,
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
            userId: user.id,
            //email: existingUser.email,
            token: token,
          },
        });
      } else {
        res.json({ message: "Invalid username/password" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  }
  return checkLogin();
};

module.exports = { register, login };
