const express = require("express");
const { create, list } = require("../controllers/transactions.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, list);
router.post("/", requireAuth, create);

module.exports = router;