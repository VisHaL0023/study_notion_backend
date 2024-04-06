import { CourseService } from "../services/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

let courseService;
class CourseController {
    constructor() {
        courseService = new CourseService();
    }

    async createCourse(req, res) {
        try {
            // Check if any of the required fields are missing
            if (
                !req.body.courseName ||
                !req.body.courseDescription ||
                !req.body.whatYouWillLearn ||
                !req.body.price ||
                !req.body.tag ||
                !req.body.category
            ) {
                errorObj.message = "All fields are mandatory";

                return res.status(StatusCodes.BAD_REQUEST).json(errorObj);
            }

            const response = await courseService.createCourse(req);
            successObj.message = "Course created successfully";
            successObj.success = true;
            successObj.data = response;
            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle any errors that occur during the creation of the course
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Failed to create course",
                error: error.message,
            });
        }
    }
}

export default CourseController;
