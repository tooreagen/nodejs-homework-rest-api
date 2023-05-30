const { User } = require("../schemas/user-db-schema");

const userRegister = async (user) => {
  return await User.create(user);
};

const userFind = async (email) => {
  return await User.findOne({ email: email });
};

module.exports = {
  userRegister,
  userFind,
};
