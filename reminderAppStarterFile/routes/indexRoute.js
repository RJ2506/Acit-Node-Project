const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/dashboard", ensureAuthenticated, async(req, res) => {
    const user = await req.user;
    res.render("dashboard", {
        user: user,
    });
});

router.get("/admin", isAdmin, async(req, res) => {
    const user = await req.user;
    res.render("admin", {
        user: user,
    });
});

module.exports = router;