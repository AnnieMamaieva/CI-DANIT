import express from "express";
import NewspostsController from "../controllers/newsposts.controller.js";
import validateNewspostMiddleware from "../middleware/validateNewspost.middleware.js";
import passport from "../passport.js";
const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.get("/newsposts", NewspostsController.getAll);
router.get("/newsposts/error", NewspostsController.getError);
router.get("/newsposts/:id", NewspostsController.getById);
router.post(
  "/newsposts",
  validateNewspostMiddleware,
  NewspostsController.create,
);
router.put(
  "/newsposts/:id",
  validateNewspostMiddleware,
  NewspostsController.update,
);
router.delete("/newsposts/:id", NewspostsController.delete);

export default router;
