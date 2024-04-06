import { Router } from "express";
import { AuthController } from "../../controllers/index.js";

const router = Router();

let authController = new AuthController();

router.post("/signup", authController.createUser);
router.post("/login", authController.logIn);
router.post("/sendotp", authController.sendOtp);

export default router;
