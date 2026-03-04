const express = require("express");
const { monthlySummary } = require("../controllers/analytics.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/monthly", requireAuth, monthlySummary);

module.exports = router;