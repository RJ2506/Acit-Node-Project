const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GitHubStrategy = require("passport-github2").Strategy;

const githubLogin = passport.use(
    new GitHubStrategy({
            clientID: process.env.githubClientID,
            clientSecret: process.env.githubClientSecret,
            callbackURL: "http://localhost:3001/auth/github/callback",
        },
        async(accessToken, refreshToken, profile, done) => {
            let user = await userController.getUserGit(profile);
            return user ?
                done(null, user) :
                done(null, false, {
                    message: "Your login details are not valid",
                });
        }
    )
);

const localLogin = passport.use(
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
        },
        async(email, password, done) => {
            const user = await userController.getUserByEmailIdAndPassword(
                email,
                password
            );

            return user ?
                done(null, user) :
                done(null, false, {
                    message: "Your login details are not valid. Please try again",
                });
        }
    )
);

passport.serializeUser(function(user, done) {
    // The function where a session is created';
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = { localLogin, githubLogin };