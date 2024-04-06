import {
    CoursesRepository,
    UserRepository,
    CategoryRepository,
} from "../repositories/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

class CourseService {
    constructor() {
        this.coursesRepository = new CoursesRepository();
        this.userRepository = new UserRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async createCourse(req) {
        try {
            const userId = req.user.id;
            let {
                courseName,
                courseDescription,
                whatYouWillLearn,
                price,
                tag,
                category,
                status,
                instructions,
            } = req.body;

            if (!status || status === undefined) {
                status = "Draft";
            }
            // Check if the user is an instructor
            const instructorDetails = await this.userRepository.get(userId, {
                accountType: "Instructor",
            });

            if (!instructorDetails) {
                errorObj.success = false;
                errorObj.message = "Instructor Details Not Found";
                throw errorObj;
            }

            // Check if the tag given is valid
            const categoryDetails =
                await this.categoryRepository.findByCategory({
                    name: category,
                });
            if (!categoryDetails) {
                errorObj.success = false;
                errorObj.message = "Category Details Not Found";
                throw errorObj;
            }

            // Create a new course with the given details
            const newCourse = await this.coursesRepository.create({
                courseName,
                courseDescription,
                instructor: instructorDetails._id,
                whatYouWillLearn: whatYouWillLearn,
                price,
                tag: tag,
                category: categoryDetails._id,
                status: status,
                instructions: instructions,
            });

            // Add the new course to the User Schema of the Instructor
            await this.userRepository.update(
                {
                    _id: instructorDetails._id,
                },
                {
                    $push: {
                        courses: newCourse._id,
                    },
                },
                { new: true }
            );

            // Add the new course to the Categories
            await this.categoryRepository.update(
                { _id: categoryDetails._id },
                {
                    $push: {
                        courses: newCourse._id,
                    },
                },
                { new: true }
            );
            // Return the new course and a success message
            console.log("all is well");
            successObj.success = true;
            successObj.data = newCourse;
            successObj.message = "Course Created Successfully";
            return successObj;
        } catch (error) {
            console.log("Error in course service", error);
            throw error;
        }
    }
}

export default CourseService;
