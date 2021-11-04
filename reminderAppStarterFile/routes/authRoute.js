const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
let { database } = require("../models/userModel.js");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) =>
    res.render("auth/login")
);
router.get("/register", (req, res) => res.render("auth/register"));

router.post(
    "/login",
    passport.localLogin.authenticate("local", {
        successRedirect: "/auth/dashboard",
        failureRedirect: "/auth/login",
    })
);

router.post("/register", (req, res) => {
    database.push({
        id: database.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    database["password"] = req.body.password;
    res.render("auth/login");
});

router.get(
    "/github",
    passport.githubLogin.authenticate("github", { scope: ["profile"] })
);

router.get(
    "/github/callback",
    passport.githubLogin.authenticate("github", { failureRedirect: "/login" }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("/auth/dashboard");
    }
);

module.exports = router;