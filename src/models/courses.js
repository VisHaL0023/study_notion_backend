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
        ref: "User",
      },
    ],
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseContent: {
      type: Schema.Types.ObjectId,
      ref: "CourseContent",
    },
    ratingReview: {
      type: Schema.Types.ObjectId,
      ref: "RatingReview",
    },
    courseSections: [
      {
        type: Schema.Types.ObjectId,
        ref: "CourseSection",
      },
    ],
  },
  { timestamps: true }
);

const Courses = model("courses", courseSchema);

export default Courses;
