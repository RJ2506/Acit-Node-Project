const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const fetch = require("node-fetch");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    let photo_URL = "";
    fetch(
            `https://api.unsplash.com/photos/random?client_id=${process.env.unsplashClientID}`
        )
        .then((response) => response.json())
        .then(async(data) => {
            const urls = data.urls;
            photo_URL = urls.thumb;
            const { name, email, password } = req.body;
            const user = await prisma.user.create({
                data: { name, email, role: "user", photo: photo_URL, password },
            });

            res.render("auth/login");
        })
        .catch((err) => {
            res.status(404).jsonp("email is already been taken!");
        });
});

router.get(
    "/github",
    passport.githubLogin.authenticate("github", { scope: ["user:email"] })
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