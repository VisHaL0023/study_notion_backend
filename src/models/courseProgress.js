const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  completedVideos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSection",
  },
});

const CourseProgress = mongoose.model("courseProgress", progressSchema);

module.exports = CourseProgress;
