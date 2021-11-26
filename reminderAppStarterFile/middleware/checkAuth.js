module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/auth/login");
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/dashboard");
    },
    isAdmin: async function(req, res, next) {
        const role = await req.user;
        if (req.isAuthenticated()) {
            if (role.role === "admin") {
                return next();
            }
            res.redirect("/dashboard");
        }
    },
};