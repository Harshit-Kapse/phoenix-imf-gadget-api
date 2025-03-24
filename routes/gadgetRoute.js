const express = require("express");
const router = express.Router();

// importing controllers
const { getGadgets, addGadget, updateGadget, deleteGadget } = require("../controllers/gadgetController");
const { generateConfirmationCode, destroyGadget } = require("../controllers/gadgetDestroyController");
const { auth } = require("../middlewares/authMiddleware");


router.get("", auth, getGadgets)
    .post("", auth, addGadget)
    .patch("/:id", auth, updateGadget)
    .delete("/:id", auth, deleteGadget);

router.get("/:id", auth, generateConfirmationCode)
    .post("/:id/self-destruct", auth, destroyGadget);

module.exports = router;