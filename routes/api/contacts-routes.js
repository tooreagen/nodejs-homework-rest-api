const express = require("express");
const contactsController = require("../../controllers/contacts-controller");
const router = express.Router();
const contactSchema = require("../../schemas/contact-api-schema");
const { validateBody } = require("../../decorators/validateBody");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validateBody(contactSchema), contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  validateBody(contactSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(contactSchema),
  contactsController.updateStatusContact
);

module.exports = router;
