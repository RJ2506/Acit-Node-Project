const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const fetch = require('node-fetch')
let { database } = require("../models/userModel.js");


const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) =>
    res.render("auth/login")
);
router.get("/register", (req, res) => res.render("auth/register"));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
});

router.post(
    "/login",
    passport.localLogin.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
    })
);

router.post("/register", (req, res) => {
    let photo_URL = ''
    fetch( `https://api.unsplash.com/photos/random?client_id=${process.env.unsplashClientID}`)
    .then((response) => response.json())
    .then((data) => {
        const urls = data.urls
        photo_URL = urls.thumb
        database.push({
            id: database.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            photo: photo_URL
        });
        database["password"] = req.body.password;
        res.render("auth/login");
    })
    
});

router.get(
    "/github",
    passport.githubLogin.authenticate("github", { scope: ["profile"] })
);

router.get(
    "/github/callback",
    passport.githubLogin.authenticate("github", {
        failureRedirect: "/auth/login",
    }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("/dashboard");
    }
);

module.exports = router;