let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  revoke: (req, res) => {
    let sessionToDestroy = req.params.id;
    console.log(sessionToDestroy);
    console.log(Object.keys(req.session.store));
    req.session.store.destroy(sessionToDestroy, function (err) {
      console.log(err);
    });
    res.render("adminDash", { session: req.sessionStore.sessions });
  },

  admin: (req, res) => {
    // console.log(JSON.parse(req.sessionStore.sessions));
    res.render("adminDash", { session: req.sessionStore.sessions });
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToUpdate = req.params.id;
    database.cindy.reminders[reminderToUpdate - 1] = {
      id: reminderToUpdate,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === "true",
    };
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToDelete = req.params.id;
    let reminderIndex = database.cindy.reminders.findIndex(
      (item) => item.id == reminderToDelete
    );
    database.cindy.reminders.splice(reminderIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
