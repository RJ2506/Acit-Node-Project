const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
let { database } = require("../models/userModel.js")

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));
router.get("/register", (req, res) => res.render("auth/register"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.post("/register", (req, res) => {

  database.push({
      id: database.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password

  })
  database["password"] = req.body.password;
  res.render("auth/login");
}
)


module.exports = router;