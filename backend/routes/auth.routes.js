import express from "express";
import AuthController from "../controllers/authcontroller.js";
import validateRegisterMiddleware from "../middleware/validateRegister.middleware.js";
import passport from "../passport.js";

const router = express.Router();
router.post("/register", validateRegisterMiddleware, AuthController.register);
router.post("/login", AuthController.login);
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  AuthController.getUser,
);
export default router;
