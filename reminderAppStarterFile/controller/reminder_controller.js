const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let remindersController = {
    // retrieves the list in the database based on the user's id
    list: async(req, res) => {
        const user = await req.user;
        const reminder_user = await prisma.reminder.findMany({
            where: {
                User: {
                    id: user.id,
                },
            },
            orderBy: { createdAt: "desc" },
            include: { User: true },
        });
        res.render("reminder/index", {
            reminders: reminder_user,
        });
    },

    // redirects to the reminder/create route when user wants to create a new reminders
    new: (req, res) => {
        res.render("reminder/create");
    },

    revoke: async(req, res) => {
        let sessionToDestroy = await req.params.id;
        req.sessionStore.destroy(sessionToDestroy, function(err) {
            console.log(err);
        });
        res.render("adminDash", { session: req.sessionStore.sessions });
    },

    admin: async(req, res) => {
        const sessions = await req.sessionStore.sessions;
        res.render("adminDash", { session: sessions });
    },
    //to view the reminder
    listOne: async(req, res) => {
        const paramId = req.params.id;
        let searchResult = await prisma.reminder.findUnique({
            where: { id: paramId },
        });
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            res.render("reminder/index", { reminders: "" });
        }
    },

    create: async(req, res) => {
        const user_id = await req.user;

        const { title, description } = await req.body;
        try {
            const user = await prisma.reminder.create({
                data: {
                    title: title,
                    description: description,
                    completed: false,
                    User: {
                        connect: {
                            id: user_id.id,
                        },
                    },
                },
            });
            res.redirect("/reminders");
        } catch (err) {
            res.status(404).jsonp("title already exist!");
        }
    },

    edit: async(req, res) => {
        let reminderToFind = req.params.id;
        try {
            let searchResult = await prisma.reminder.findUnique({
                where: { id: reminderToFind },
            });
            res.render("reminder/edit", { reminderItem: searchResult });
        } catch (err) {
            res.status(404).jsonp(err);
        }
    },

    update: async(req, res) => {
        let reminderToFind = req.params.id;
        const { title, description, completed } = req.body;
        try {
            let searchResult = await prisma.reminder.findUnique({
                where: { id: reminderToFind },
            });

            searchResult = await prisma.reminder.update({
                where: { id: reminderToFind },
                data: {
                    title,
                    description,
                    completed: completed === "true",
                },
            });
            res.redirect("/reminders");
        } catch (err) {
            res.status(404).jsonp(err);
        }
    },

    delete: async(req, res) => {
        // Implement this code
        let reminderToFind = req.params.id;
        try {
            let searchResult = await prisma.reminder.delete({
                where: { id: reminderToFind },
            });
            res.redirect("/reminders");
        } catch (err) {
            res.status(404).jsonp(err);
        }
    },
};

module.exports = remindersController;