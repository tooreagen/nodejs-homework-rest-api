const { User } = require("../schemas/user-db-schema");

const userRegister = async (user) => {
  return await User.create(user);
};

const userFind = async (email) => {
  return await User.findOne({ email: email });
};

const userFindById = async (id) => {
  return await User.findById(id);
};

const userUpdate = async (id, query) => {
  return await User.findByIdAndUpdate(id, query, { new: true });
};

const userFindByToken = async (token) => {
  return await User.findOne({ token: token });
};

const userFindVerificationToken = async (findObj) => {
  return await User.findOne(findObj);
};

module.exports = {
  userRegister,
  userFind,
  userUpdate,
  userFindById,
  userFindByToken,
  userFindVerificationToken,
};
