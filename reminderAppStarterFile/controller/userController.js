const userModel = require("../models/userModel").userModel;
const User = require("../models/userGithub").User;

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

const getGithubID = (id) => {
    let user = User.findById(id);
    if (user) {
        if (isGitIdValid(user, id)) {
            return user;
        }
    }
    return null;
};

function isUserValid(user, password) {
    return user.password === password;
}

function isGitIdValid(user, id) {
    return user.id === id;
}

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
    getGithubID,
};