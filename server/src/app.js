require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const { requireAuth } = require("./middleware/auth.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "BudgetTrack API is running" });
});

// Auth routes
app.use("/api/auth", authRoutes);
const transactionRoutes = require("./routes/transactions.routes");
app.use("/api/transactions", transactionRoutes);

// Protected test route
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ userId: req.userId });
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;