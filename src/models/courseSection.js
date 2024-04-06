import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
    sectionName: {
        type: String,
        required: true,
    },
    subSection: {
        type: Schema.Types.ObjectId,
        ref: "SubSection",
    },
});

const CourseSection = model("CourseSection", sectionSchema);

export default CourseSection;
