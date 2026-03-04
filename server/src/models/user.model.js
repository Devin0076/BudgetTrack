const userRepo = require("../repositories/user.repository");

module.exports = {
  createUser: userRepo.createUser,
  findUserByEmail: userRepo.findUserByEmail,
};