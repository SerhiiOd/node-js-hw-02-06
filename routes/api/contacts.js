const express = require("express");
const ctrl = require("../../controlers/contacts");
const router = express.Router();
const { schemas } = require("../../models/contacts");
const { validateBody, emptyBody, isValidid } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:id", isValidid, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.patch(
  "/:id/favorite",
  isValidid,
  validateBody(schemas.updateFavoretesSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidid, ctrl.removeContact);

router.put(
  "/:id",
  isValidid,
  emptyBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

module.exports = router;
