import { Router } from "express";
import UserController from "../controllers/user.controller.js";
const controller = new UserController();
const router = Router();
import {
  login,
  logout,
  visit,
  infoSession,
} from "../controllers/user.controller.js";
import { validateLogIn } from "../middlewares/middlewares.js";

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/login", login);

router.get("/info", validateLogIn, infoSession);

router.get("/secret-endpoint", validateLogIn, visit);

router.post("/logout", logout);

export default router;