const { userModel, userGit } = require("../models/userModel");

const getUserByEmailIdAndPassword = async(email, password) => {
    let user = await userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};
const getUserById = async(id) => {
    let user = await userModel.findById(id);
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

const getUserByRole = async(role) => {
    let user = await userModel.findByRole(role);
    if (user) {
        return user;
    }
    return null;
};

const isUserValid = (user, password) => {
    return user.password === password;
};

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
    getUserGit,
    getUserByRole,
};