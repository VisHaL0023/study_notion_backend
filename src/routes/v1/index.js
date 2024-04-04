import { Router } from "express";

import { InfoController, AuthController } from "../../controllers/index.js";

const router = Router();

let authController = new AuthController();

router.get("/info", InfoController.info);
router.post("/signup", authController.createUser);

export default router;
