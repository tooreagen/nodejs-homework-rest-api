const { HttpError } = require("../helpers");
const contactsService = require("../models/contactsService/contact-service");
const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const listContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.removeContact(id);
  if (!contact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.updateContact(id, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(contact);
};

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const contact = await contactsService.updateStatusContact(id, req.body);
  if (!contact) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(contact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
