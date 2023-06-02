const { HttpError } = require("../helpers");
const contactsService = require("../models/contact-service");
const { ctrlWrapper } = require("../decorators/ctrlWrapper");

const listContacts = async (req, res) => {
  const { favorite } = req.query;

  if (favorite === "true") {
    const contacts = await contactsService.listContacts({ favorite: true });
    res.json(contacts);
  }

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

const paginateContacts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const contacts = await contactsService.paginationContacts(page, limit);
    const countContacts = await (await contactsService.listContacts()).length;

    res.json({
      contacts,
      totalPages: Math.ceil(countContacts / limit),
      currentPage: page,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  paginateContacts: ctrlWrapper(paginateContacts),
};
