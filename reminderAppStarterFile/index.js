const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const session = require("express-session");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

//import passport
const passport = require("./middleware/passport");

//import all routes
const authRoute = require("./routes/authRoute");
const indexROute = require("./routes/indexRoute");
const uploadRoute = require("./routes/uploadRoute");

//initialize the passports
app.use(passport.localLogin.initialize());
app.use(passport.localLogin.session());
app.use(passport.githubLogin.initialize());
app.use(passport.githubLogin.session());

//import the authentication
const { ensureAuthenticated, isAdmin } = require("./middleware/checkAuth.js");

// Middleware for express

// Routes start here
app.get("/admin", isAdmin, reminderController.admin);

app.get("/revoke/:id", isAdmin, reminderController.revoke);

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

app.use("/", indexROute);
// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.use("/auth", authRoute);

app.use("/photo", uploadRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log(
        `Server running. Visit: localhost:${PORT}/reminders in your browser `
    );
});