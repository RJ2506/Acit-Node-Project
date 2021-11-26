const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userModel = {
    findOne: async(email) => {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (user) {
            return user;
        }
    },
    findById: async(id) => {
        const user = await prisma.user.findUnique({
            where: { id: id },
        });
        if (user) {
            return user;
        }
    },
    findByRole: async(role) => {
        const user = await prisma.user.findUnique({
            where: { role: "admin" },
        });
        if (user) {
            return user;
        }
    },
};

const userGit = {
    findById: async(profile) => {
        const user = await prisma.user.findUnique({
            where: { id: profile.id },
        });
        if (user) {
            return user;
        } else {
            const user = await prisma.user.create({
                data: {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                    photo: profile.photos[0].value,
                    role: "user",
                },
            });
            const new_user = await prisma.user.findUnique({
                where: { id: profile.id },
            });
            return new_user;
        }
    },
};

module.exports = { userModel, userGit };