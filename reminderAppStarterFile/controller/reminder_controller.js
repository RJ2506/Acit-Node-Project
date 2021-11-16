let database = require("../database");
const user = require("../models/userModel").database;

let remindersController = {
    list: (req, res) => {
        const username = req.user.name.replace(" ", "_");
        console.log(database);
        res.render("reminder/index", {
            reminders: database[username].reminders,
        });
    },

    new: (req, res) => {
        res.render("reminder/create");
    },

    revoke: (req, res) => {
        let sessionToDestroy = req.params.id;
        // console.log(sessionToDestroy);
        // console.log(Object.keys(req.session.store));
        req.sessionStore.destroy(sessionToDestroy, function(err) {
            console.log(err);
        });
        res.render("adminDash", { session: req.sessionStore.sessions });
    },

    admin: (req, res) => {
        // console.log(JSON.parse(req.sessionStore.sessions));
        res.render("adminDash", { session: req.sessionStore.sessions });
    },
    //to view the reminder
    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        const username = req.user.name.replace(" ", "_");
        let searchResult = database[username].reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            res.render("reminder/index", { reminders: database[username].reminders });
        }
    },

    create: (req, res) => {
        const username = req.user.name.replace(" ", "_");
        let reminder = {
            id: database[username].reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };
        database[username].reminders.push(reminder);
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        const username = req.user.name.replace(" ", "_");
        let searchResult = database[username].reminders.find(function(reminder) {
            return reminder.id == reminderToFind;
        });
        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        const username = req.user.name.replace(" ", "_");
        let reminderToUpdate = req.params.id;
        database[username].reminders[reminderToUpdate - 1] = {
            id: reminderToUpdate,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed === "true",
        };
        res.redirect("/reminders");
    },

    delete: (req, res) => {
        // Implement this code
        const username = req.user.name.replace(" ", "_");
        let reminderToDelete = req.params.id;
        let reminderIndex = database[username].reminders.findIndex(
            (item) => item.id == reminderToDelete
        );
        database[username].reminders.splice(reminderIndex, 1);
        res.redirect("/reminders");
    },
};

module.exports = remindersController;