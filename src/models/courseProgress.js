import { Schema, model } from "mongoose";

const progressSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Courses",
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    completedVideos: {
        type: Schema.Types.ObjectId,
        ref: "SubSection",
    },
});

const CourseProgress = model("courseProgress", progressSchema);

export default CourseProgress;
