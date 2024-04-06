import { Schema, model } from "mongoose";

const raitingSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        raiting: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
            max: [250, "Review cannot be of more than 250 characters"],
        },
        course: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Course",
            index: true,
        },
    },
    { timestamps: true }
);

const RaitingReview = model("RaitingReview", raitingSchema);

export default RaitingReview;
