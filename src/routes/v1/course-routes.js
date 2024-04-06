import { Router } from "express";
import { CourseController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = Router();

let courseController = new CourseController();

router.post("/createCourse", authenticate, courseController.createCourse);

export default router;
