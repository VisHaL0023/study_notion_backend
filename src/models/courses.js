const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    courseContent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseContent",
    },
    ratingReview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingReview",
    },
    courseSections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSection",
      },
    ],
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", courseSchema);

module.exports = Courses;
