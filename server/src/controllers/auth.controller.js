const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/user.model");
const AppError = require("../errors/AppError");

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return next(new AppError("Email is already registered", 409));
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser(email, passwordHash);

    return res.status(201).json({ user });
  } catch (err) {
    console.error("Register error:", err);
    return next(new AppError("Internal server error", 500));
  }
}


async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
    } catch (err) {
    console.error("Login error:", err);
    return next(new AppError("Internal server error", 500));
  }
}

module.exports = { register, login };