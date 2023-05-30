const { User } = require("../schemas/user-db-schema");

const userRegister = async (user) => {
  return await User.create(user);
};

const userFind = async (email) => {
  return await User.findOne({ email: email });
};

const userTokenUpdate = async (userId, token) => {
  return await User.findByIdAndUpdate(userId, { token: token });
};

module.exports = {
  userRegister,
  userFind,
  userTokenUpdate,
};
