const bcrypt = require("bcrypt");
const saltRounds = 10;
//const myPlaintextPassword = "s0//P4$$w0rD";

const genrateHash = async (myPlaintextPassword) => {
  const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

  console.log('This is bcrypt js console log: ' + hashedPassword);

  return hashedPassword;
};

const findHash = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = {
  genrateHash,
  findHash,
};
