const { Contact } = require("../schemas/contact-db-schema");

const listContacts = async (query = {}) => {
  return await Contact.find(query);
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return await Contact.findOneAndRemove(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body);
};

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
};

const paginationContacts = async (page, limit) => {
  return await Contact.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  paginationContacts,
};
