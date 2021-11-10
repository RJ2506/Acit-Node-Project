const { userModel, userGit } = require("../models/userModel");

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};
const getUserGit = (profile) => {
  let user = userGit.findById(profile);
  if (user) {
    return user;
  }
  return null;
};
const getUserByRole = (role) => {
  let user = userModel.findByRole(role);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

// function isUserAdmin(user) {
//   return user.role === "admin";
// }

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserGit,
  getUserByRole,
};
