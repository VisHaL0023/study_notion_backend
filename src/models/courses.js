import { Schema, model } from "mongoose";

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true,
        },
        courseDescription: {
            type: String,
            required: true,
        },
        whatYouWillLearn: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        studentEnrolled: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
        ],
        instructor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        courseContent: [
            {
                type: Schema.Types.ObjectId,
                ref: "CourseSection",
            },
        ],
        ratingReview: [
            {
                type: Schema.Types.ObjectId,
                ref: "RatingReview",
            },
        ],
        instructions: {
            type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
        category: {
            type: Schema.Types.ObjectId,
            // required: true,
            ref: "Category",
        },
    },
    { timestamps: true }
);

const Courses = model("Courses", courseSchema);

export default Courses;
