const express = require("express");
const { create, list, update, remove } = require("../controllers/transactions.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, list);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

module.exports = router;