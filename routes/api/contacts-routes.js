const express = require("express");
const contactsController = require("../../controllers/contacts-controller");
const router = express.Router();
const schemas = require("../../schemas/contacts-schemas");
const { validateBody } = require("../../decorators/validateBody");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactSchema),
  contactsController.updateContact
);

module.exports = router;
