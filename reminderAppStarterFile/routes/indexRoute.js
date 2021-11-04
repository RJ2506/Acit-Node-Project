const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/auth/dashboard", ensureAuthenticated, (req, res) => {
    res.render("/auth/dashboard", { user: req.user });
});

module.exports = router;