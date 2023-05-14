// const fs = require('fs/promises')

const contacts = require("./contacts.json");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  return contacts.find((item) => item.id === contactId) || null;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
