// server/src/routes/user.routes.js

import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// PUBLIC ROUTE
router.route("/register").post(registerUser);

export default router;  