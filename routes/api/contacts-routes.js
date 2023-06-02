const express = require("express");
const contactsController = require("../../controllers/contacts-controller");
const router = express.Router();
const contactSchema = require("../../schemas/contact-api-schema");
const { validateBody } = require("../../decorators/validateBody");
const authorization = require("../../middlewares/authorization");

router.use(authorization);

router.get("/", contactsController.listContacts);

router.get("/paginate", contactsController.paginateContacts);

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
