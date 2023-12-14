import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import {
  registerResponse,
  loginResponse,
  githubResponse,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

import passport from "passport";

const controller = new UserController();
const router = Router();
import {
  login,
  logout,
  visit,
  infoSession,
} from "../controllers/user.controller.js";
import { validateLogIn } from "../middlewares/middlewares.js";

router.post("/register", passport.authenticate('register'),controller.register, registerResponse);

router.post("/login",passport.authenticate('login'), controller.login, loginResponse);

router.get("/private", isAuth, (req, res) => res.send("route private"));

router.get(
  "/register-github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  githubResponse
);

//router.post("/login", login);

router.get("/info", validateLogIn, infoSession);

router.get("/secret-endpoint", validateLogIn, visit);

router.post("/logout", logout);

export default router;