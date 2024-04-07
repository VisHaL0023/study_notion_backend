import { Router } from "express";
import { CourseController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = Router();

let courseController = new CourseController();

// Protected routes, need logged in to access it

router.post("/createCourse", authenticate, courseController.createCourse);

export default router;
