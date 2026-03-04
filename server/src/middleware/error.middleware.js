const AppError = require("../errors/AppError");

function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to Express default handler
  if (res.headersSent) return next(err);

  // Normalize unknown errors into AppError
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal server error";

  
  const payload = { error: message };

  if (!isAppError && process.env.NODE_ENV !== "production") {
    payload.details = String(err?.message || err);
  }

  return res.status(statusCode).json(payload);
}

module.exports = { errorHandler };