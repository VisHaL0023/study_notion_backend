import { Schema, model } from "mongoose";

const raitingSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const RaitingReview = model("raitingReview", raitingSchema);

export default RaitingReview;
