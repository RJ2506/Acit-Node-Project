let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        res.render("auth/register");
    },

    loginSubmit: (req, res) => {
        res.render("/");
    },
};

module.exports = authController;