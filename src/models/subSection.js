import { Schema, model } from "mongoose";

const subSectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    timeDuration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    additionalUrl: {
        type: String,
    },
});

const SubSection = model("Subsection", subSectionSchema);

export default SubSection;
