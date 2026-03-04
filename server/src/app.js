const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const { requireAuth } = require("./middleware/auth.middleware");
const { errorHandler } = require("./middleware/error.middleware");
const analyticsRoutes = require("./routes/analytics.routes");

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

app.use("/api/analytics", analyticsRoutes);

// Protected test route
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ userId: req.userId });
});


const clientPath = path.join(__dirname, "../../client");

app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

app.use(errorHandler);

module.exports = app;