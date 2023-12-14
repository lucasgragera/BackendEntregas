import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/user.dao.js";
import UserServices from "../servicies/user.services.js";
const userDao = new UserDao();

const strategyOptions = {
  clientID: "Iv1.2008954da0c738a3",
  clientSecret: "64d2633f48e5bec39e2dc0c5dc2e171daba59d31",
  callbackURL: "http://localhost:8080/users/github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  // console.log(profile);
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await UserServices.register({
    first_name: profile._json.name,
    email,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

/*
App ID: 703651

Client ID: Iv1.2008954da0c738a3

clientSecret: 64d2633f48e5bec39e2dc0c5dc2e171daba59d31

http://localhost:8080/users/github
*/