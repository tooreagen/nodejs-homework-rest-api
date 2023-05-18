const express = require("express");
const joi = require("joi");
const { HttpError } = require("../../helpers");

const contactsService = require("../../models/contacts/index");

const router = express.Router();

const contactSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(50)
    .pattern(new RegExp(`^[a-z A-Z\s]+$`))
    .message("<name> only lowercase and uppercase letters and a space")
    .required(),
  email: joi
    .string()
    .email()
    .message("<email> E-mail should be in the format email@domain.name")
    .required(),
  phone: joi
    .string()
    .pattern(new RegExp(`^[0-9\s()+ -]{10,20}$`))
    .message("<phone> length from 10 to 20, may contain digits, spaces, () + -")
    .required(),
});
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contact = await contactsService.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const id = req.params.contactId;
    const contact = await contactsService.updateContact(id, req.body);
    if (!contact) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
