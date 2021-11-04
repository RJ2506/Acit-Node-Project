const fakeDatabase = [{
    name: "RJ",
    email: "rjgayem@gmail.com",
    username: "RJ2506",
    photos: "https://avatars.githubusercontent.com/u/77298403?v=4",
    id: "77298403",
}, ];

const User = {
    findById: (id) => {
        const user = fakeDatabase.find((user) => user.id === id);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find ${user} with id: ${id}`);
    },
};

module.exports = { fakeDatabase, User };