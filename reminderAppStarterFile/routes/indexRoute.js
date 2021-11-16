const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
let reminder_database = require("../database");

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    const username = req.user.name.replace(" ", "_");
    let searchResult = reminder_database[username];
    console.log(searchResult);
    if (searchResult) {
        res.render("dashboard", {
            user: req.user,
        });
    }
    reminder_database[username] = {
        reminders: [],
    };
    res.render("dashboard", {
        user: req.user,
    });
});

router.get("/admin", isAdmin, (req, res) => {
    res.render("admin", {
        user: req.user,
    });
});

module.exports = router;