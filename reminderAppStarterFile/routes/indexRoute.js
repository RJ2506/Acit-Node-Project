const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { ensureAuthenticated } = require("../middleware/checkAuth");
=======
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});
>>>>>>> main

router.get("/dashboard", ensureAuthenticated, (req, res) => {
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
