import { Courses } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class CoursesRepository extends CrudRepository {
    constructor() {
        super(Courses);
    }

    async getCourseDetails(id) {
        try {
            const course = await Courses.find({ _id: id })
                .populate("category")
                .populate({
                    path: "courseContent",
                    populate: { path: "SubSection" },
                })
                .populate({
                    path: "ratingReview",
                    populate: {
                        path: "user",
                    },
                })
                .populate({
                    path: "instructor",
                    populate: {
                        path: "profile",
                        select: "firstName lastName accountType image",
                    },
                })
                .exec();

            return course;
        } catch (error) {
            throw error;
        }
    }

    async find(query) {
        try {
            console.log("query", query);
            const response = await this.model
                .findOne({
                    $or: [
                        {
                            courseName: {
                                $regex: query,
                                $options: "i",
                            },
                        },
                        { tag: { $regex: query, $options: "i" } },
                        {
                            courseDescription: {
                                $regex: query,
                                $options: "i",
                            },
                        },
                    ],
                })
                .populate({
                    path: "instructor",
                })
                .populate("category")
                .populate("ratingReview")
                .exec();
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }
}

export default CoursesRepository;
