const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "admin",
    email: "admin123@gmail.com",
    password: "admin123!",
    role: "admin",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByRole: (role) => {
    const user = database.find((user) => user.role === "admin");
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find registered admin`);
  },
};

const userGit = {
  findById: (profile) => {
    let user = database.find((user) => user.id === profile.id);
    if (user) {
      return user;
    }
    database.push({
      id: profile.id,
      name: profile.displayName,
      username: profile.username,
      photo: profile.photos[0].value,
    });
    user = database.find((user) => user.id === profile.id);
    return user;
  },
};

module.exports = { database, userModel, userGit };
