const User = require("../models/users");
const { genrateHash, findHash } = require("../utils/bcrypt");
const Joi = require('joi');                                         // to validate data from user

const userSignupSchema = Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string().optional(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile_no: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
  });

  //userSignupSchema.password
  const postUser = async (req, res) => {
    //var postData = req.body;
    let postPass = await genrateHash(userSignupSchema.password);
    console.log(postPass);
    userSignupSchema.password = postPass;
    let data = await User.create(userSignupSchema);
    res.status(200).json({ data: data });
  };


  module.exports = userSignupSchema;

